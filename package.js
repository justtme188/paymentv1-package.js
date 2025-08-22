document.addEventListener("DOMContentLoaded", function () {
    const target = document.querySelector(".standard-form-container.deposit-container");
    if (!target) return;

  
    target.style.display = "block";
    target.innerHTML = "";

   
    target.innerHTML = `
<style>
.payment-box {
    max-width: 450px;
    margin: 20px auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    font-family: sans-serif;
}
.payment-header {
    background: #0099ff;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding: 12px;
}
.payment-tabs {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    gap: 10px;
}
.payment-option {
    flex: 1;
    text-align: center;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #f9f9f9;
    transition: all 0.3s ease-in-out;
}
.payment-option img {
    display: block;
    max-height: 28px;
}
.payment-option.active {
    border-color: #0099ff;
    background: #e6f4ff;
    box-shadow: 0 2px 8px rgba(0,153,255,0.3);
}
.payment-option:hover {
    border-color: #007bff;
    background: #eef7ff;
}
.qr-container {
    text-align: center;
    padding: 10px;
}
.qr-container img {
    max-width: 200px;
}
.btn-download {
    background: #007bff;
    color: #fff;
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    margin-top: 8px;
    cursor: pointer;
}
.form-section {
    padding: 10px;
}
.form-section label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}
.form-section input {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    margin-bottom: 10px;
}
.summary {
    padding: 10px;
    font-size: 14px;
    color: #333;
}
.summary b {
    float: right;
    color: #ff6600;
}
.btn-submit {
    width: 90%;
    margin: 10px auto;
    display: block;
    padding: 12px;
    background: #28a745;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
}
.btn-submit:hover {
    background: #218838;
}
</style>

<div class="payment-box">
    <div class="payment-header">PEMBAYARAN</div>
    <div class="payment-tabs">
        <div class="payment-option" id="bank-option">
            <img src="https://cdn-icons-png.flaticon.com/512/3237/3237422.png" alt="Bank Transfer">
            <span>Bank Transfer</span>
        </div>
        <div class="payment-option active" id="qris-option">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/2560px-QRIS_logo.svg.png" alt="QRIS" style="max-height:40px;">
        </div>
    </div>


 
            <div class="qr-container" id="qr-section">
                <img src="https://i.ibb.co.com/N64N6y4X/In-Shot-20250715-191738382.jpg" alt="QR Code">
                <br>
                <button class="btn-download" onclick="alert('QR Code diunduh!')">Unduh QR Code</button>
            </div>

            <div class="form-section bank-section" style="display:none;">
                <label>Pilih Rekening:</label>
                <select id="payment_method" style="width:100%;padding:10px;border-radius:6px;border:1px solid #ccc;">
                    <optgroup label="REKENING BANK">
                        <option value="BRI|564101052645534">BRI - 564101052645534 - ACEP</option>
                        <option value="MANDIRI|1120023711083">MANDIRI - 1120023711083 - RIDUAN</option>
                        <option value="BCA|ALIHKAN QRIS">BCA - ALIHKAN QRIS</option>
                        <option value="BNI|1928874785">BNI - 1928874785 - RIDUAN</option>
                    </optgroup>
                    <optgroup label="E-WALET">
                        <option value="DANA|088985395138">DANA - 088985395138 - ARWANSYAH</option>
                        <option value="OVO|088985395138">OVO - 088985395138 - SOLIA</option>
                        <option value="GOPAY|088985395138">GO-PAY - 088985395138 - SOLIA</option>
                    </optgroup>
                </select>
                <button type="button" id="copy-account" style="width:100%;padding:10px;background:#007bff;color:#fff;border:none;border-radius:6px;margin-top:8px;">Salin Nomor Rekening</button>
            </div>

            <div class="form-section">
                <label>Jumlah:</label>
                <input type="text" id="amount" placeholder="Rp 50.000">
            </div>

            <div class="summary">
                METODE: <b id="method-label">QRIS</b><br>
                Total: <b id="total-label">Rp 0</b>
            </div>

            <button class="btn-submit" id="btn-submit">Kirim</button>
        </div>

        <form id="depositForm" method="POST" action="/deposit" style="display:none;">
            <input type="hidden" name="deposit" value="1">
            <input type="hidden" name="asal_deposit" id="asal_deposit" value="">
            <input type="hidden" name="tujuan_deposit" id="tujuan_deposit" value="">
            <input type="hidden" name="bonus" id="bonus" value="">
            <input type="hidden" name="jumlah_deposit" id="jumlah_deposit" value="">
        </form>
    `;

    // JavaScript untuk interaksi
    const bankOption = document.getElementById("bank-option");
    const qrisOption = document.getElementById("qris-option");
    const qrSection = document.getElementById("qr-section");
    const bankSection = document.querySelector(".bank-section");
    const amountInput = document.getElementById("amount");
    const methodLabel = document.getElementById("method-label");
    const totalLabel = document.getElementById("total-label");
    const btnSubmit = document.getElementById("btn-submit");
    const selectBank = document.getElementById("payment_method");

    function formatRupiah(angka) {
        return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(angka);
    }
    function formatAngka(val) {
        return val.replace(/\D/g,'').replace(/\B(?=(\d{3})+(?!\d))/g,".");
    }
    amountInput.addEventListener("input", () => {
        const raw = amountInput.value.replace(/\D/g,'');
        amountInput.value = formatAngka(raw);
        totalLabel.textContent = formatRupiah(parseInt(raw) || 0);
    });

    bankOption.addEventListener("click", () => {
        bankOption.classList.add("active");
        qrisOption.classList.remove("active");
        qrSection.style.display = "none";
        bankSection.style.display = "block";
        methodLabel.textContent = selectBank.value.toUpperCase();
    });
    qrisOption.addEventListener("click", () => {
        qrisOption.classList.add("active");
        bankOption.classList.remove("active");
        qrSection.style.display = "block";
        bankSection.style.display = "none";
        methodLabel.textContent = "QRIS";
    });

    btnSubmit.addEventListener("click", () => {
        const rawAmount = amountInput.value.replace(/\D/g,'');
        const amount = parseInt(rawAmount) || 0;
        if(amount < 50000){ alert("Minimal deposit Rp50.000"); return; }
        document.getElementById("jumlah_deposit").value = amount;
        if(qrisOption.classList.contains("active")){
            document.getElementById("asal_deposit").value = "QRIS";
            document.getElementById("tujuan_deposit").value = "QRIS";
        } else {
            document.getElementById("asal_deposit").value = "Bank Transfer";
            document.getElementById("tujuan_deposit").value = selectBank.value;
        }
        document.getElementById("depositForm").submit();
    });

    // Default QRIS
    qrisOption.click();
});
