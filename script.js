const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {

    const seatNo = document.getElementById("seatNo").value.trim();

    if (!seatNo) {
        alert("من فضلك أدخل رقم الجلوس");
        return;
    }

    searchBtn.disabled = true;
    searchBtn.innerHTML = "⏳ جاري البحث...";

    try {

        const response = await fetch("/api/result/" + seatNo);

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            searchBtn.disabled = false;
            searchBtn.innerHTML = "عرض النتيجة";

            return;
        }

        localStorage.setItem("student", JSON.stringify(data.student));

        setTimeout(() => {

            window.location.href = "result.html";

        }, 2000);

    } catch (err) {

        alert("حدث خطأ أثناء الاتصال بالسيرفر");
document.getElementById("loading").style.display = "flex";
        searchBtn.disabled = false;
        searchBtn.innerHTML = "عرض النتيجة";

    }

});