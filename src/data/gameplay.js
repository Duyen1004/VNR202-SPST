import { getAssetPath } from "@/lib/utils";

const sharedNodeMeta = [
  { x: 12, y: 30, labelPlacement: "bottom", labelWidth: 132, type: "start" },
  { x: 24, y: 14, labelPlacement: "bottom", labelWidth: 154, type: "challenge", questionIndex: 0 },
  { x: 40, y: 10, labelPlacement: "bottom", labelWidth: 148, type: "challenge", questionIndex: 1 },
  { x: 57, y: 13, labelPlacement: "bottom", labelWidth: 136, type: "challenge", questionIndex: 2 },
  { x: 74, y: 11, labelPlacement: "bottom", labelWidth: 146, type: "challenge", questionIndex: 3 },
  { x: 90, y: 23, labelPlacement: "top", labelWidth: 154, type: "challenge", questionIndex: 4 },
  { x: 80, y: 48, labelPlacement: "left", labelWidth: 132, type: "challenge", questionIndex: 5 },
  { x: 60, y: 62, labelPlacement: "bottom", labelWidth: 138, type: "challenge", questionIndex: 6 },
  { x: 41, y: 55, labelPlacement: "left", labelWidth: 156, type: "challenge", questionIndex: 7 },
  { x: 23, y: 72, labelPlacement: "bottom", labelWidth: 128, type: "challenge", questionIndex: 8 },
  { x: 49, y: 82, labelPlacement: "bottom", labelWidth: 134, type: "exit", questionIndex: 9 }
];

const stageNodeImages = {
  1: [
    "images/stage-1-event-01.jpg",
    "images/stage-1-event-02.jpg",
    "images/stage-1-event-03.jpg",
    "images/stage-1-event-04.jpg",
    "images/stage-1-event-05.jpg",
    "images/stage-1-event-06.jpg",
    "images/stage-1-event-07.jpg",
    "images/stage-1-event-08.jpg",
    "images/stage-1-event-09.jpg",
    "images/stage-1-event-10.jpg",
    "images/stage-1-event-11.jpg"
  ],
  2: [
    "images/stage-2-event-01.jpg",
    "images/stage-2-event-02.jpg",
    "images/stage-2-event-03.jpg",
    "images/stage-2-event-04.jpg",
    "images/stage-2-event-05.jpg",
    "images/stage-2-event-06.jpg",
    "images/stage-2-event-07.jpg",
    "images/stage-2-event-08.jpg",
    "images/stage-2-event-09.jpg",
    "images/stage-2-event-10.jpg",
    "images/stage-2-event-11.jpg"
  ],
  3: [
    "images/stage-3-event-01.jpg",
    "images/stage-3-event-02.jpg",
    "images/stage-3-event-03.jpg",
    "images/stage-3-event-04.jpg",
    "images/stage-3-event-05.jpg",
    "images/stage-3-event-06.jpg",
    "images/stage-3-event-07.jpg",
    "images/stage-3-event-08.jpg",
    "images/stage-3-event-09.jpg",
    "images/stage-3-event-10.jpg",
    "images/stage-3-event-11.jpg"
  ],
  4: [
    "images/stage-4-event-01.jpg",
    "images/stage-4-event-02.jpg",
    "images/stage-4-event-03.jpg",
    "images/stage-4-event-04.jpg",
    "images/stage-4-event-05.jpg",
    "images/stage-4-event-06.jpg",
    "images/stage-4-event-07.jpg",
    "images/stage-4-event-08.jpg",
    "images/stage-4-event-09.jpg",
    "images/stage-4-event-10.jpg",
    "images/stage-4-event-11.jpg"
  ],
  5: [
    "images/stage-5-event-01.jpg",
    "images/stage-5-event-02.jpg",
    "images/stage-5-event-03.jpg",
    "images/stage-5-event-04.jpg",
    "images/stage-5-event-05.jpg",
    "images/stage-5-event-06.jpg",
    "images/stage-5-event-07.jpg",
    "images/stage-5-event-08.jpg",
    "images/stage-5-event-09.jpg",
    "images/stage-5-event-10.jpg",
    "images/stage-5-event-11.jpg"
  ],
  6: [
    "images/stage-6-event-01.jpg",
    "images/stage-6-event-02.jpg",
    "images/stage-6-event-03.jpg",
    "images/stage-6-event-04.jpg",
    "images/stage-6-event-05.jpg",
    "images/stage-6-event-06.jpg",
    "images/stage-6-event-07.jpg",
    "images/stage-6-event-08.jpg",
    "images/stage-6-event-09.jpg",
    "images/stage-6-event-10.jpg",
    "images/stage-6-event-11.jpg"
  ]
};

function createMazeLayout(stageNumber, labels) {
  const imageSet = stageNodeImages[stageNumber];

  return sharedNodeMeta.map((node, index) => ({
    id: index,
    ...node,
    label: labels[index],
    image: getAssetPath(imageSet[index % imageSet.length])
  }));
}

function makeQuestion(category, question, answers, correct, explanation) {
  return { category, question, answers, correct, explanation };
}

const stageBackgroundImages = {
  1: getAssetPath("images/pac-bo-stage-1.jpg"),
  2: getAssetPath("images/pac-bo-stage-2.jpg"),
  3: getAssetPath("images/pac-bo-stage-3.jpg"),
  4: getAssetPath("images/pac-bo-stage-4.jpg"),
  5: getAssetPath("images/pac-bo-stage-5.jpg"),
  6: getAssetPath("images/pac-bo-stage-6.jpg")
};

const stage1Questions = [
  makeQuestion("Ð?i tu?ng môn h?c", "Môn L?ch s? Ð?ng ch? y?u nghiên c?u di?u gì?", ["Quá trình ra d?i, lãnh d?o và phát tri?n c?a Ð?ng", "Ti?u s? các vua và tri?u d?i phong ki?n Vi?t Nam", "L?ch s? van h?c và phong t?c Vi?t Nam", "L?ch s? th? gi?i c?n hi?n d?i toàn c?u"], 0, "Môn h?c t?p trung vào quá trình hình thành, du?ng l?i và vai trò lãnh d?o c?a Ð?ng."),
  makeQuestion("B?i c?nh thu?c d?a", "Cu?i th? k? XIX, xã h?i Vi?t Nam bi?n d?i sâu s?c vì nguyên nhân nào?", ["Tri?u dình t? c?i cách thành công toàn di?n", "Th?c dân Pháp xâm lu?c và th?ng tr?", "Ðông Nam Á l?p m?t nhà nu?c chung", "Vi?t Nam dã công nghi?p hóa xong"], 1, "S? th?ng tr? c?a Pháp làm thay d?i co c?u xã h?i và d?t ra yêu c?u gi?i phóng dân t?c."),
  makeQuestion("Kh?ng ho?ng c?u nu?c", "Các phong trào yêu nu?c d?u th? k? XX th?t b?i ch? y?u do dâu?", ["Thi?u tinh th?n ch?ng ngo?i xâm trong c? nu?c", "Không có ngu?i dân tham gia d?u tranh", "Thi?u du?ng l?i và l?c lu?ng lãnh d?o phù h?p", "Không còn mâu thu?n dân t?c gay g?t"], 2, "Phong trào yêu nu?c r?t dáng trân tr?ng nhung chua gi?i quy?t du?c kh?ng ho?ng du?ng l?i."),
  makeQuestion("Nguy?n Ái Qu?c", "Ði?m m?i trong con du?ng c?u nu?c c?a Nguy?n Ái Qu?c là gì?", ["D?a h?n vào c?i luong thu?c d?a", "Khôi ph?c ch? d? quân ch? phong ki?n cu", "Ch? v?n d?ng trong t?ng l?p quan l?i", "G?n d?c l?p dân t?c v?i cách m?ng vô s?n"], 3, "Nguy?n Ái Qu?c tìm th?y con du?ng c?u nu?c theo khuynh hu?ng cách m?ng vô s?n."),
  makeQuestion("T? ch?c ti?n thân", "Các t? ch?c c?ng s?n ra d?i nam 1929 cho th?y di?u gì?", ["Phong trào cách m?ng c?n th?ng nh?t t? ch?c", "Phong trào công nhân dã ch?m d?t hoàn toàn trên c? nu?c", "Ð?t nu?c dã giành d?c l?p dân t?c", "Không c?n chính d?ng lãnh d?o cách m?ng"], 0, "Các t? ch?c c?ng s?n ph?n ánh s? phát tri?n c?a khuynh hu?ng vô s?n và yêu c?u h?p nh?t."),
  makeQuestion("Thành l?p Ð?ng", "Ð?ng C?ng s?n Vi?t Nam ra d?i vào th?i di?m nào?", ["19 tháng 8 nam 1945", "3 tháng 2 nam 1930", "2 tháng 9 nam 1945", "30 tháng 4 nam 1975"], 1, "Ngày 3/2/1930 g?n v?i H?i ngh? h?p nh?t các t? ch?c c?ng s?n."),
  makeQuestion("Cuong linh d?u tiên", "Cuong linh chính tr? d?u tiên d?t nhi?m v? trung tâm nào?", ["Phát tri?n thuong m?i trong khuôn kh? thu?c d?a", "Tách cách m?ng Vi?t Nam kh?i phong trào th? gi?i", "Gi?i phóng dân t?c và b?o v? quy?n l?i nhân dân", "Xóa b? m?i hình th?c d?u tranh chính tr?"], 2, "Cuong linh nêu rõ nhi?m v? gi?i phóng dân t?c g?n v?i quy?n l?i c?a nhân dân."),
  makeQuestion("Ý nghia ra d?i", "Ý nghia l?n nh?t c?a vi?c Ð?ng ra d?i là gì?", ["Làm Vi?t Nam công nghi?p hóa ngay l?p t?c", "K?t thúc m?i cu?c chi?n tranh trên th? gi?i", "Thay th? toàn b? các t? ch?c xã h?i", "Ch?m d?t kh?ng ho?ng v? du?ng l?i c?u nu?c"], 3, "Ð?ng ra d?i t?o l?c lu?ng lãnh d?o th?ng nh?t cho cách m?ng Vi?t Nam."),
  makeQuestion("Phuong pháp h?c", "Khi h?c L?ch s? Ð?ng, cách ti?p c?n nào phù h?p nh?t?", ["G?n s? ki?n v?i b?i c?nh và k?t qu?", "Ch? h?c thu?c các ngày tháng tiêu bi?u", "Ch? ghi nh? tên van ki?n quan tr?ng", "Ch? quan tâm d?n s? ki?n quân s?"], 0, "Hi?u l?ch s? c?n d?t s? ki?n trong b?i c?nh và ti?n trình v?n d?ng."),
  makeQuestion("T?ng k?t ch?ng 1", "Ð?ng ra d?i là k?t qu? c?a s? k?t h?p nào?", ["Ch? gi?a phong trào nông dân và si phu", "Mác - Lênin, công nhân và yêu nu?c", "Ho?t d?ng hành chính c?a tri?u dình", "M?t bi?n c? ng?u nhiên trong xã h?i"], 1, "Ð?ng ra d?i t? yêu c?u khách quan và s? chu?n b? v? tu tu?ng, chính tr?, t? ch?c.")
];

const stage2Questions = [
  makeQuestion("Cao trào 1930-1931", "Ð?nh cao tiêu bi?u c?a phong trào 1930-1931 là s? ki?n nào?", ["Phong trào Ðông Du", "Chi?n d?ch Biên gi?i", "Xô vi?t Ngh? - Tinh", "T?ng ti?n công M?u Thân"], 2, "Xô vi?t Ngh? - Tinh là d?nh cao tiêu bi?u c?a cao trào cách m?ng d?u tiên."),
  makeQuestion("Lu?n cuong 1930", "Lu?n cuong chính tr? tháng 10/1930 nh?n m?nh n?i dung nào?", ["Ch? phát tri?n giáo d?c tu th?c lâu dài", "Hòa hoãn lâu dài v?i chính quy?n th?c dân", "Không c?n t? ch?c Ð?ng trong qu?n chúng", "Ð?u tranh ch?ng phong ki?n và d? qu?c"], 3, "Lu?n cuong b? sung nh?n th?c v? cách m?ng Ðông Duong trong b?i c?nh lúc b?y gi?."),
  makeQuestion("M?t tr?n dân ch?", "Phong trào dân ch? 1936-1939 nêu m?c tiêu tru?c m?t nào?", ["Dân sinh, dân ch?, com áo, hòa bình", "T? b? m?i hình th?c m?t tr?n", "Ðánh nhanh b?ng l?c lu?ng ngoài nu?c", "Xây d?ng quân d?i chính quy ngay"], 0, "Ð?ng linh ho?t chuy?n hu?ng sách lu?c d? t?p h?p qu?n chúng r?ng rãi."),
  makeQuestion("Chuy?n hu?ng chi?n lu?c", "T? nam 1939, nhi?m v? hàng d?u du?c Ð?ng d?t ra là gì?", ["Phát tri?n du l?ch thu?c d?a", "Gi?i phóng dân t?c", "M? r?ng d?c quy?n kinh t?", "Ch? c?i cách van hóa"], 1, "Chi?n tranh th? gi?i th? hai làm nhi?m v? d?c l?p dân t?c tr? nên c?p bách."),
  makeQuestion("Trung uong 8", "H?i ngh? Trung uong 8 nam 1941 g?n v?i quy?t d?nh nào?", ["Ký Hi?p d?nh Gionevo", "Phát d?ng d?i m?i kinh t?", "Thành l?p M?t tr?n Vi?t Minh", "Th?ng nh?t d?t nu?c v? nhà nu?c"], 2, "H?i ngh? hoàn ch?nh ch? truong gi?i phóng dân t?c và l?p M?t tr?n Vi?t Minh."),
  makeQuestion("Vi?t Minh", "Vai trò chính c?a M?t tr?n Vi?t Minh là gì?", ["Ch? d?i di?n m?t ngành kinh t? thu?c d?a", "T? ch?c b?u c? ngh? vi?n Pháp ? Ðông Duong", "Thay th? m?i chính quy?n sau nam 1975", "T?p h?p l?c lu?ng yêu nu?c giành d?c l?p"], 3, "Vi?t Minh là hình th?c m?t tr?n phù h?p d? chu?n b? t?ng kh?i nghia."),
  makeQuestion("Th?i co 1945", "Th?i co T?ng kh?i nghia tháng Tám xu?t hi?n tr?c ti?p khi nào?", ["Nh?t d?u hàng Ð?ng minh", "M? rút quân kh?i Vi?t Nam", "Pháp ký Hi?p d?nh Pari", "Ð?i m?i du?c kh?i xu?ng"], 0, "Nh?t d?u hàng t?o kho?ng tr?ng quy?n l?c d? cách m?ng ch?p th?i co."),
  makeQuestion("T?ng kh?i nghia", "Y?u t? nào quy?t d?nh th?ng l?i c?a Cách m?ng tháng Tám?", ["Do m?t nu?c ngoài làm thay toàn b?", "Ðu?ng l?i dúng và s?c m?nh toàn dân", "Không c?n chu?n b? l?c lu?ng lâu dài", "Ch? nh? may m?n quân s? nh?t th?i"], 1, "Th?ng l?i d?n t? s? lãnh d?o k?p th?i và quá trình chu?n b? lâu dài."),
  makeQuestion("Tuyên ngôn d?c l?p", "Ngày 2/9/1945 g?n v?i s? ki?n nào?", ["Ký Hi?p d?nh Pari v? Vi?t Nam", "Thành l?p M?t tr?n Vi?t Minh toàn qu?c ? Pác Bó", "Ch? t?ch H? Chí Minh d?c Tuyên ngôn d?c l?p", "M? Chi?n d?ch H? Chí Minh l?ch s?"], 2, "Ngày 2/9/1945 m? d?u k? nguyên d?c l?p c?a dân t?c Vi?t Nam."),
  makeQuestion("Bài h?c 1945", "Bài h?c n?i b?t t? th?ng l?i nam 1945 là gì?", ["Ch? d?a vào d?u tranh ngh? tru?ng h?p pháp", "Không c?n t? ch?c chính tr? c?a qu?n chúng", "Tách d?c l?p dân t?c kh?i s?c dân", "Ðoàn k?t dân t?c và n?m b?t th?i co"], 3, "Ð?ng bi?t t?p h?p l?c lu?ng, chu?n b? và hành d?ng khi th?i co d?n.")
];

const stage3Questions = [
  makeQuestion("Tình th? sau 1945", "Sau Cách m?ng tháng Tám, nu?c ta d?ng tru?c tình th? nào?", ["Ngàn cân treo s?i tóc", "Không còn khó khan l?n", "Ðã công nghi?p hóa xong", "Không còn thù trong gi?c ngoài"], 0, "Chính quy?n non tr? ph?i d?i m?t v?i nhi?u khó khan nghiêm tr?ng."),
  makeQuestion("B?o v? chính quy?n", "M?t nhi?m v? c?p bách sau nam 1945 là gì?", ["Gi?i tán l?c lu?ng t? v? cách m?ng ? d?a phuong", "C?ng c? chính quy?n và cham lo d?i s?ng", "Ng?ng m?i ho?t d?ng ngo?i giao", "T? b? m?c tiêu d?c l?p dân t?c"], 1, "Ð?ng lãnh d?o xây d?ng nhà nu?c m?i, ch?ng gi?c dói, gi?c d?t và ngo?i xâm."),
  makeQuestion("Toàn qu?c kháng chi?n", "L?i kêu g?i Toàn qu?c kháng chi?n du?c phát ra khi nào?", ["3 tháng 2 nam 1930", "2 tháng 9 nam 1945", "19 tháng 12 nam 1946", "30 tháng 4 nam 1975"], 2, "Khi hòa hoãn không còn kh? nang, toàn dân bu?c vào kháng chi?n ch?ng Pháp."),
  makeQuestion("Ðu?ng l?i kháng chi?n", "Ðu?ng l?i kháng chi?n ch?ng Pháp du?c khái quát ra sao?", ["Ðánh nhanh b?ng l?c lu?ng ngoài nu?c h? tr?", "Ch? d?u tranh kinh t? bí m?t", "Không c?n xây d?ng h?u phuong", "Toàn dân, toàn di?n, tru?ng k?, t? l?c"], 3, "Ðu?ng l?i này phù h?p tuong quan l?c lu?ng và phát huy s?c m?nh toàn dân."),
  makeQuestion("Vi?t B?c 1947", "Chi?n th?ng Vi?t B?c Thu - Ðông 1947 có ý nghia gì?", ["Làm th?t b?i k? ho?ch dánh nhanh c?a Pháp", "K?t thúc hoàn toàn chi?n tranh ? Ðông Duong", "M? d?u công cu?c d?i m?i d?t nu?c", "Thành l?p nu?c Vi?t Nam th?ng nh?t"], 0, "Chi?n th?ng b?o v? can c? d?a và co quan d?u não kháng chi?n."),
  makeQuestion("Biên gi?i 1950", "K?t qu? n?i b?t c?a Chi?n d?ch Biên gi?i 1950 là gì?", ["Ký Hi?p d?nh Pari v? ch?m d?t chi?n tranh", "Khai thông biên gi?i và giành th? ch? d?ng", "Xóa b? chính quy?n cách m?ng ? toàn can c? d?a", "Th?ng nh?t d?t nu?c ngay l?p t?c"], 1, "Chi?n d?ch Biên gi?i t?o bu?c chuy?n quan tr?ng cho kháng chi?n ch?ng Pháp."),
  makeQuestion("Ð?i h?i II", "Ð?i h?i II c?a Ð?ng nam 1951 có ý nghia nào?", ["Tuyên b? gi?i th? Ð?ng trong kháng chi?n", "K?t thúc th?i k? d?i m?i d?t nu?c", "Ðua Ð?ng ra ho?t d?ng công khai", "Thành l?p M?t tr?n Vi?t Minh m?i"], 2, "Ð?i h?i c?ng c? t? ch?c và du?ng l?i lãnh d?o kháng chi?n, ki?n qu?c."),
  makeQuestion("Ði?n Biên Ph?", "Chi?n th?ng Ði?n Biên Ph? nam 1954 t?o co s? cho s? ki?n nào?", ["Cách m?ng tháng Tám", "Ð?i h?i VI c?a Ð?ng", "Chi?n d?ch H? Chí Minh", "Ký Hi?p d?nh Gionevo"], 3, "Ði?n Biên Ph? là th?ng l?i quân s? quy?t d?nh trong kháng chi?n ch?ng Pháp."),
  makeQuestion("Hi?p d?nh Gionevo", "Hi?p d?nh Gionevo nam 1954 công nh?n di?u gì?", ["Các quy?n dân t?c co b?n c?a Vi?t Nam", "Vi?t Nam là thu?c d?a lâu dài c?a Pháp", "Mi?n Nam tách kh?i Vi?t Nam vinh vi?n", "Không có l?c lu?ng nu?c ngoài rút quân"], 0, "Hi?p d?nh công nh?n d?c l?p, ch? quy?n, th?ng nh?t và toàn v?n lãnh th?."),
  makeQuestion("Bài h?c ch?ng Pháp", "Bài h?c l?n c?a kháng chi?n ch?ng Pháp là gì?", ["Ch? d?a vào vi?n tr? bên ngoài", "Phát huy s?c m?nh toàn dân", "Không c?n h?u phuong kháng chi?n", "Không c?n ho?t d?ng ngo?i giao"], 1, "Th?ng l?i d?n t? du?ng l?i dúng và s? k?t h?p quân s?, chính tr?, ngo?i giao.")
];

const stage4Questions = [
  makeQuestion("Hai nhi?m v?", "Sau nam 1954, cách m?ng Vi?t Nam th?c hi?n nhi?m v? nào?", ["Ch? phát tri?n thuong m?i ? các dô th? l?n", "T? b? m?c tiêu th?ng nh?t d?t nu?c", "Xây d?ng mi?n B?c và gi?i phóng mi?n Nam", "Ch? làm cách m?ng van hóa ? mi?n B?c"], 2, "Ð?t nu?c t?m th?i chia c?t nên hai nhi?m v? chi?n lu?c g?n bó ch?t ch?."),
  makeQuestion("Mi?n B?c", "Trong kháng chi?n ch?ng M?, mi?n B?c gi? vai trò gì?", ["Khu v?c trung l?p ngoài cu?c", "Th? tru?ng tiêu th? chính", "Không có vai trò chính tr?", "H?u phuong l?n c?a c? nu?c"], 3, "Mi?n B?c v?a xây d?ng CNXH v?a chi vi?n cho ti?n tuy?n mi?n Nam."),
  makeQuestion("Mi?n Nam", "Nhi?m v? tr?c ti?p c?a cách m?ng mi?n Nam sau 1954 là gì?", ["Ð?u tranh ch?ng th?c dân m?i, ti?n t?i gi?i phóng", "Xây d?ng n?n quân ch? m?i ? mi?n Nam lâu dài", "T? b? d?u tranh chính tr? và hòa bình", "Ch? phát tri?n du l?ch d?a phuong"], 0, "Cách m?ng mi?n Nam k?t h?p d?u tranh chính tr?, quân s? và binh v?n."),
  makeQuestion("Ð?ng kh?i", "Phong trào Ð?ng kh?i 1959-1960 dánh d?u chuy?n bi?n nào?", ["K?t thúc hoàn toàn chi?n tranh Vi?t Nam", "T? gi? gìn l?c lu?ng sang th? ti?n công", "M? d?u công cu?c d?i m?i kinh t?", "Thành l?p Ð?ng C?ng s?n Vi?t Nam"], 1, "Ð?ng kh?i t?o th? phát tri?n m?i cho cách m?ng mi?n Nam."),
  makeQuestion("M?t tr?n gi?i phóng", "M?t tr?n Dân t?c Gi?i phóng mi?n Nam ra d?i nh?m m?c tiêu gì?", ["T? ch?c xu?t kh?u nông s?n ? mi?n Nam", "Thay th? các t? ch?c qu?c t? ? toàn Ðông Duong", "T?p h?p l?c lu?ng ch?ng M? và chính quy?n Sài Gòn", "Ng?ng d?u tranh th?ng nh?t d?t nu?c"], 2, "M?t tr?n t?p h?p r?ng rãi các l?c lu?ng yêu nu?c ? mi?n Nam."),
  makeQuestion("Chi?n tranh d?c bi?t", "Th?ng l?i nào góp ph?n làm phá s?n 'Chi?n tranh d?c bi?t'?", ["Chi?n d?ch Biên gi?i nam 1950", "Chi?n th?ng Vi?t B?c nam 1947", "Ðu?ng l?i d?i m?i nam 1986", "?p B?c và phá ?p chi?n lu?c"], 3, "Các th?ng l?i ? mi?n Nam ch?ng minh kh? nang dánh b?i chi?n lu?c c?a M?."),
  makeQuestion("M?u Thân 1968", "T?ng ti?n công M?u Thân 1968 có tác d?ng l?n nào?", ["Làm M? xu?ng thang chi?n tranh", "K?t thúc ngay chi?n tranh Vi?t Nam", "Thành l?p Liên h?p qu?c m?i", "M? d?u Cách m?ng tháng Tám"], 0, "M?u Thân t?o bu?c ngo?t l?n v? chính tr? và ngo?i giao."),
  makeQuestion("Hi?p d?nh Pari", "Hi?p d?nh Pari nam 1973 có n?i dung quan tr?ng nào?", ["Pháp tr? l?i Ðông Duong ki?m soát Vi?t Nam", "M? rút quân và tôn tr?ng d?c l?p Vi?t Nam", "Vi?t Nam t? b? th?ng nh?t d?t nu?c", "Mi?n B?c gi?i tán chính quy?n cách m?ng"], 1, "Hi?p d?nh t?o di?u ki?n chi?n lu?c d? ti?n t?i gi?i phóng mi?n Nam."),
  makeQuestion("Chi?n d?ch H? Chí Minh", "Chi?n d?ch H? Chí Minh nam 1975 k?t thúc b?ng s? ki?n nào?", ["Ký Hi?p d?nh Gionevo v? Ðông Duong", "Thành l?p Ð?ng C?ng s?n Vi?t Nam", "Gi?i phóng Sài Gòn, th?ng nh?t d?t nu?c", "M? d?u kháng chi?n ch?ng th?c dân Pháp"], 2, "Ngày 30/4/1975 là m?c th?ng l?i hoàn toàn c?a cu?c kháng chi?n ch?ng M?."),
  makeQuestion("Bài h?c ch?ng M?", "Nhân t? quy?t d?nh th?ng l?i giai do?n 1954-1975 là gì?", ["Ch? do uu th? vu khí hi?n d?i t? bên ngoài", "Không c?n h?u phuong mi?n B?c trong chi?n tranh", "Không có nhân dân tham gia d?u tranh", "S? lãnh d?o c?a Ð?ng và d?i doàn k?t dân t?c"], 3, "Th?ng l?i d?n t? s? lãnh d?o dúng d?n và s?c m?nh c?a c? dân t?c.")
];

const stage5Questions = [
  makeQuestion("Sau th?ng nh?t", "Sau nam 1975, nhi?m v? l?n c?a c? nu?c là gì?", ["Kh?c ph?c h?u qu? chi?n tranh và xây d?ng d?t nu?c", "Chia c?t d?t nu?c lâu dài thành hai mi?n riêng bi?t", "Ng?ng phát tri?n kinh t? và xã h?i", "T? b? m?c tiêu d?c l?p dân t?c"], 0, "Sau d?i th?ng 1975, c? nu?c bu?c vào th?i k? xây d?ng trong nhi?u khó khan."),
  makeQuestion("T?ng tuy?n c? 1976", "Cu?c T?ng tuy?n c? nam 1976 có ý nghia gì?", ["M? d?u kháng chi?n ch?ng Pháp l?n hai", "Hoàn thành th?ng nh?t v? m?t nhà nu?c", "K?t thúc Cách m?ng tháng Tám nam 1945", "Thành l?p M?t tr?n Vi?t Minh toàn qu?c"], 1, "T?ng tuy?n c? b?u Qu?c h?i chung c?a nu?c Vi?t Nam th?ng nh?t."),
  makeQuestion("Tên nu?c", "T? nam 1976, tên nu?c chính th?c c?a Vi?t Nam là gì?", ["Vi?t Nam Dân ch? C?ng hòa th?ng nh?t", "Liên bang Ðông Duong d?c l?p", "C?ng hòa xã h?i ch? nghia Vi?t Nam", "Qu?c gia Vi?t Nam th?ng nh?t"], 2, "Qu?c h?i khóa VI quy?t d?nh tên nu?c C?ng hòa xã h?i ch? nghia Vi?t Nam."),
  makeQuestion("Khó khan kinh t?", "M?t h?n ch? l?n c?a co ch? bao c?p là gì?", ["T?o c?nh tranh th? tru?ng m?nh", "Làm xu?t kh?u tang nhanh", "Không ?nh hu?ng d?i s?ng", "Kìm hãm s?n xu?t và luu thông"], 3, "Co ch? qu?n lý t?p trung quan liêu bao c?p b?c l? nhi?u h?n ch?."),
  makeQuestion("B?o v? biên gi?i", "Cu?i th?p niên 1970, Vi?t Nam ph?i chú tr?ng nhi?m v? nào?", ["B?o v? biên gi?i và ch? quy?n T? qu?c", "Ng?ng xây d?ng qu?c phòng trong c? nu?c", "Ch? t?p trung ho?t d?ng l? h?i d?a phuong", "T? b? ch? quy?n lãnh th? qu?c gia"], 0, "Ð?t nu?c v?a xây d?ng sau chi?n tranh v?a ph?i b?o v? ch? quy?n."),
  makeQuestion("Tìm tòi co ch? m?i", "Các tìm tòi d?i m?i tru?c Ð?i h?i VI nh?m gi?i quy?t v?n d? gì?", ["Khôi ph?c ch? d? thu?c d?a ? Vi?t Nam", "Tháo g? khó khan trong s?n xu?t", "Xóa b? s?n xu?t hàng hóa trong xã h?i", "Ng?ng luu thông hàng hóa trên th? tru?ng"], 1, "Th?c ti?n d?t ra yêu c?u d?i m?i tu duy và co ch? qu?n lý."),
  makeQuestion("Ð?i h?i VI", "Ð?i h?i VI nam 1986 du?c xem là m?c nào?", ["Thành l?p Ð?ng C?ng s?n Vi?t Nam", "Gi?i phóng mi?n Nam th?ng nh?t d?t nu?c", "Kh?i xu?ng công cu?c d?i m?i", "Ký Hi?p d?nh Gionevo v? Ðông Duong"], 2, "Ð?i h?i VI dánh d?u bu?c ngo?t d?i m?i toàn di?n, tru?c h?t là kinh t?."),
  makeQuestion("Quan di?m d?i m?i", "Hi?u dúng v? d?i m?i nam 1986 là gì?", ["T? b? hoàn toàn con du?ng dã ch?n", "Ch? d?i tên m?t s? t? ch?c chính tr?", "Không liên quan d?n d?i s?ng c?a nhân dân", "Ð?i m?i nhung gi? m?c tiêu d?c l?p và CNXH"], 3, "Ð?i m?i nh?m phát tri?n d?t nu?c và gi? v?ng d?nh hu?ng xã h?i ch? nghia."),
  makeQuestion("Bài h?c th?c ti?n", "Bài h?c quan tr?ng t? giai do?n 1975-1986 là gì?", ["Xu?t phát t? th?c ti?n d?t nu?c", "Ch? c?n ý chí ch? quan trong lãnh d?o", "Không c?n t?ng k?t th?c ti?n xã h?i", "Ðóng c?a hoàn toàn v?i th? gi?i"], 0, "Th?c ti?n khó khan giúp Ð?ng rút ra yêu c?u d?i m?i tu duy."),
  makeQuestion("L?i ra 1986", "Ý nghia c?a giai do?n 1975-1986 là gì?", ["Không liên quan d?n công cu?c d?i m?i d?t nu?c", "Chu?n b? nh?n th?c cho du?ng l?i d?i m?i", "Ch? có ý nghia quân s? trong l?ch s?", "Là th?i k? không c?n nghiên c?u"], 1, "Giai do?n này t?o co s? th?c ti?n và nh?n th?c cho công cu?c d?i m?i.")
];

const stage6Questions = [
  makeQuestion("Ð?i m?i kinh t?", "Tr?ng tâm d?i m?i nh?ng nam d?u sau Ð?i h?i VI là linh v?c nào?", ["Van h?c", "Th? thao", "Kinh t?", "Thiên van"], 2, "Ð?i m?i kinh t? là khâu d?t phá d? tháo g? kh?ng ho?ng."),
  makeQuestion("Kinh t? th? tru?ng", "Kinh t? th? tru?ng d?nh hu?ng XHCN ? Vi?t Nam nh?n m?nh di?u gì?", ["B? vai trò qu?n lý c?a Nhà nu?c", "Quay l?i co ch? bao c?p toàn di?n", "Ch? gi? m?t thành ph?n kinh t? nhà nu?c", "Th? tru?ng g?n v?i qu?n lý c?a Nhà nu?c"], 3, "Mô hình này v?n d?ng kinh t? th? tru?ng trong d?nh hu?ng phát tri?n c?a Vi?t Nam."),
  makeQuestion("Công nghi?p hóa", "Công nghi?p hóa, hi?n d?i hóa hu?ng t?i m?c tiêu nào?", ["T?o n?n t?ng k? thu?t cho phát tri?n", "Gi?m vai trò khoa h?c công ngh? hi?n d?i", "Xóa b? s?n xu?t hi?n d?i trong công nghi?p", "Ch? phát tri?n t? cung t? c?p"], 0, "Công nghi?p hóa g?n v?i nang su?t, ch?t lu?ng và s?c c?nh tranh."),
  makeQuestion("H?i nh?p qu?c t?", "Ð?i ngo?i th?i k? d?i m?i nh?n m?nh phuong châm nào?", ["T? cô l?p hoàn toàn v?i th? gi?i", "Ð?c l?p, t? ch?, da phuong hóa", "Ch? quan h? v?i m?t nu?c duy nh?t", "Không c?n h?p tác kinh t? qu?c t?"], 1, "H?i nh?p giúp m? r?ng ngu?n l?c phát tri?n và gi? v?ng l?i ích qu?c gia."),
  makeQuestion("Xây d?ng Ð?ng", "Trong th?i k? d?i m?i, xây d?ng Ð?ng có ý nghia gì?", ["Không còn c?n thi?t trong lãnh d?o", "Ch? là vi?c hình th?c bên ngoài t? ch?c", "Nâng cao nang l?c lãnh d?o c?a Ð?ng", "Ch? liên quan kinh t? tu nhân"], 2, "Ð?ng ph?i thu?ng xuyên t? d?i m?i, t? ch?nh d?n d? dáp ?ng yêu c?u m?i."),
  makeQuestion("Nhà nu?c pháp quy?n", "Nhà nu?c pháp quy?n XHCN Vi?t Nam nh?n m?nh di?u gì?", ["Lo?i b? vai trò pháp lu?t trong xã h?i", "T?p trung quy?n l?c vào m?t cá nhân", "Không c?n ki?m soát quy?n l?c nhà nu?c", "Qu?n lý xã h?i b?ng pháp lu?t"], 3, "Nhà nu?c pháp quy?n d?t pháp lu?t và quy?n làm ch? c?a nhân dân ? trung tâm."),
  makeQuestion("Van hóa", "Quan di?m c?a Ð?ng v? van hóa trong d?i m?i là gì?", ["Van hóa là n?n t?ng tinh th?n xã h?i", "Van hóa không liên quan phát tri?n d?t nu?c", "Ch? coi van hóa là ho?t d?ng gi?i trí", "Tách van hóa kh?i s? phát tri?n con ngu?i"], 0, "Van hóa góp ph?n xây d?ng con ngu?i và s?c m?nh m?m c?a d?t nu?c."),
  makeQuestion("Thành t?u d?i m?i", "M?t thành t?u n?i b?t c?a công cu?c d?i m?i là gì?", ["Vi?t Nam m?t d?c l?p trên tru?ng qu?c t?", "Ð?i s?ng c?i thi?n, v? th? qu?c t? nâng cao", "Kinh t? không có chuy?n bi?n dáng k?", "Không còn quan h? qu?c t? v?i bên ngoài"], 1, "Ð?i m?i t?o chuy?n bi?n trên nhi?u linh v?c c?a d?i s?ng xã h?i."),
  makeQuestion("Thách th?c m?i", "M?t thách th?c trong quá trình d?i m?i và h?i nh?p là gì?", ["Không còn b?t k? khó khan nào", "Không c?n d?i m?i ti?p trong phát tri?n", "Nguy co t?t h?u và v?n d? qu?n tr?", "Không c?n qu?n tr? qu?c gia hi?n d?i"], 2, "Nh?n di?n thách th?c giúp ti?p t?c hoàn thi?n du?ng l?i phát tri?n."),
  makeQuestion("Bài h?c d?i m?i", "Bài h?c xuyên su?t c?a công cu?c d?i m?i là gì?", ["T? b? th?c ti?n d?t nu?c khi phát tri?n", "Ch? sao chép mô hình bên ngoài máy móc", "Không c?n nhân dân tham gia xây d?ng", "Kiên d?nh m?c tiêu và sáng t?o cách làm"], 3, "Ð?i m?i thành công nh? k?t h?p kiên d?nh nguyên t?c v?i sáng t?o th?c ti?n.")
];

export const lessonStages = [
  {
    id: 1,
    title: "Ch?ng 1 - Ð?ng C?ng s?n Vi?t Nam ra d?i",
    objective: "Hi?u b?i c?nh l?ch s?, vai trò c?a Nguy?n Ái Qu?c và ý nghia thành l?p Ð?ng nam 1930.",
    landmark: "C?a hang Pác Bó",
    theme: "mountain-cave",
    backgroundImage: stageBackgroundImages[1],
    questions: stage1Questions
  },
  {
    id: 2,
    title: "Ch?ng 2 - Lãnh d?o d?u tranh giành chính quy?n (1930-1945)",
    objective: "N?m các cao trào cách m?ng, ch? truong gi?i phóng dân t?c và th?ng l?i Cách m?ng tháng Tám.",
    landmark: "Ðu?ng cách m?ng",
    theme: "revolution-road",
    backgroundImage: stageBackgroundImages[2],
    questions: stage2Questions
  },
  {
    id: 3,
    title: "Ch?ng 3 - Kháng chi?n ch?ng th?c dân Pháp (1945-1954)",
    objective: "Hi?u du?ng l?i kháng chi?n toàn dân, toàn di?n và ý nghia Ði?n Biên Ph? - Gionevo.",
    landmark: "Can c? Vi?t B?c",
    theme: "resistance-base",
    backgroundImage: stageBackgroundImages[3],
    questions: stage3Questions
  },
  {
    id: 4,
    title: "Ch?ng 4 - Kháng chi?n ch?ng M?, th?ng nh?t d?t nu?c (1954-1975)",
    objective: "N?m hai nhi?m v? chi?n lu?c, vai trò h?u phuong mi?n B?c và th?ng l?i mùa Xuân 1975.",
    landmark: "Ðu?ng Tru?ng Son",
    theme: "unity-road",
    backgroundImage: stageBackgroundImages[4],
    questions: stage4Questions
  },
  {
    id: 5,
    title: "Ch?ng 5 - C? nu?c xây d?ng CNXH và tìm tòi d?i m?i (1975-1986)",
    objective: "Hi?u quá trình kh?c ph?c h?u qu? chi?n tranh, th?ng nh?t nhà nu?c và yêu c?u d?i m?i.",
    landmark: "Công tru?ng d?ng xây",
    theme: "reconstruction",
    backgroundImage: stageBackgroundImages[5],
    questions: stage5Questions
  },
  {
    id: 6,
    title: "Ch?ng 6 - Công cu?c d?i m?i và h?i nh?p (1986 d?n nay)",
    objective: "N?m du?ng l?i d?i m?i, h?i nh?p qu?c t?, thành t?u và bài h?c phát tri?n d?t nu?c.",
    landmark: "Cánh c?a h?i nh?p",
    theme: "renovation",
    backgroundImage: stageBackgroundImages[6],
    questions: stage6Questions
  }
];

export const mazeLayouts = {
  1: createMazeLayout(1, [
    "B? dá kh?i d?u",
    "B?i c?nh thu?c d?a",
    "Kh?ng ho?ng c?u nu?c",
    "D?u chân Nguy?n Ái Qu?c",
    "Ánh sáng Mác - Lênin",
    "T? ch?c ti?n thân",
    "H?i ngh? h?p nh?t",
    "Cuong linh d?u tiên",
    "Bu?c ngo?t l?ch s?",
    "Bài h?c m? d?u",
    "L?i ra nam 1930"
  ]),
  2: createMazeLayout(2, [
    "C?ng 1930",
    "Xô vi?t Ngh? - Tinh",
    "Lu?n cuong chính tr?",
    "M?t tr?n dân ch?",
    "Chuy?n hu?ng chi?n lu?c",
    "H?i ngh? Trung uong 8",
    "M?t tr?n Vi?t Minh",
    "Th?i co tháng Tám",
    "T?ng kh?i nghia",
    "Tuyên ngôn d?c l?p",
    "L?i ra d?c l?p"
  ]),
  3: createMazeLayout(3, [
    "Chính quy?n non tr?",
    "Gi?c dói gi?c d?t",
    "Toàn qu?c kháng chi?n",
    "Ðu?ng l?i kháng chi?n",
    "Can c? Vi?t B?c",
    "Chi?n d?ch Biên gi?i",
    "Ð?i h?i II",
    "Ði?n Biên Ph?",
    "Hi?p d?nh Gionevo",
    "Bài h?c kháng chi?n",
    "L?i ra hòa bình"
  ]),
  4: createMazeLayout(4, [
    "Ð?t nu?c chia c?t",
    "Mi?n B?c h?u phuong",
    "Mi?n Nam ti?n tuy?n",
    "Phong trào Ð?ng kh?i",
    "M?t tr?n gi?i phóng",
    "Ðánh b?i chi?n lu?c M?",
    "M?u Thân 1968",
    "Hi?p d?nh Pari",
    "Chi?n d?ch H? Chí Minh",
    "Ð?i th?ng mùa Xuân",
    "L?i ra th?ng nh?t"
  ]),
  5: createMazeLayout(5, [
    "Sau ngày th?ng nh?t",
    "T?ng tuy?n c? 1976",
    "Tên nu?c m?i",
    "Khó khan kinh t?",
    "B?o v? biên gi?i",
    "Tìm tòi co ch? m?i",
    "Ð?i h?i VI",
    "Tu duy d?i m?i",
    "Bài h?c th?c ti?n",
    "Chu?n b? d?i m?i",
    "L?i ra 1986"
  ]),
  6: createMazeLayout(6, [
    "C?a d?i m?i",
    "Kinh t? th? tru?ng",
    "Công nghi?p hóa",
    "H?i nh?p qu?c t?",
    "Xây d?ng Ð?ng",
    "Nhà nu?c pháp quy?n",
    "N?n t?ng van hóa",
    "Thành t?u d?t nu?c",
    "Thách th?c m?i",
    "Bài h?c d?i m?i",
    "L?i ra h?i nh?p"
  ])
};
