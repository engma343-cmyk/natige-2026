const express = require("express");
const path = require("path");
const xlsx = require("xlsx");

const app = express();
const PORT = 3000;

// قراءة ملف الإكسيل
const workbook = xlsx.readFile(path.join(__dirname, "data", "natiga.xlsx"));
const sheetName = workbook.SheetNames[0];
const students = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
console.log(students[0])

console.log("==================================");
console.log("عدد الطلاب:", students.length);
console.log("==================================");

// ملفات الموقع
app.use(express.static(path.join(__dirname, "public")));

// اختبار السيرفر
app.get("/api/health", (req, res) => {
    res.json({
    success: true,
    student: {
        name: student.arabic_name,
        seatNo: student.seating_no,
        total: Number(student.total_degree),
        percentage: Number((Number(student.total_degree) / 320) * 100).toFixed(2),
        status: Number(student.total_degree) >= 160 ? "ناجح" : "راسب",
        grade: grade
    }
});
    });

// البحث برقم الجلوس
app.get("/api/result/:seatNo", (req, res) => {

    const seatNo = req.params.seatNo.trim();

    const student = students.find(
        s => String(s.seating_no).trim() === seatNo
    );

    if (!student) {

        return res.json({
            success: false,
            message: "رقم الجلوس غير موجود"
        });

    }

    const total = Number(student.total_degree);
    console.log("total_degree =", student.total_degree);
console.log("total =", total);

    const maxTotal = 320;

    const percentage = ((total / maxTotal) * 100).toFixed(2);

    const status = total >= 160 ? "ناجح" : "راسب";

    let grade = "";

    if (status === "راسب") {

        grade = "راسب";

    } else if (percentage >= 85) {

        grade = "ممتاز";

    } else if (percentage >= 75) {

        grade = "جيد جداً";

    } else if (percentage >= 65) {

        grade = "جيد";

    } else {

        grade = "مقبول";

    }

    res.json({

        success: true,

        student: {

            name: student.arabic_name,

            seatNo: student.seating_no,

            total: total,

            percentage: percentage,

            status: status,

            grade: grade

        }

    });

});

app.listen(PORT, () => {

    console.log("🚀 Server running");
    console.log("http://localhost:3000");

});