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
    "images/stage-1-event-01.png",
    "images/stage-1-event-02.png",
    "images/stage-1-event-03.png",
    "images/stage-1-event-04.png",
    "images/stage-1-event-05.png",
    "images/stage-1-event-06.png",
    "images/stage-1-event-07.png",
    "images/stage-1-event-08.png",
    "images/stage-1-event-09.png",
    "images/stage-1-event-10.png",
    "images/stage-1-event-11.png"
  ],
  2: [
    "images/stage-2-event-01.png",
    "images/stage-2-event-02.png",
    "images/stage-2-event-03.png",
    "images/stage-2-event-04.png",
    "images/stage-2-event-05.png",
    "images/stage-2-event-06.png",
    "images/stage-2-event-07.png",
    "images/stage-2-event-08.png",
    "images/stage-2-event-09.png",
    "images/stage-2-event-10.png",
    "images/stage-2-event-11.png"
  ],
  3: [
    "images/stage-3-event-01.png",
    "images/stage-3-event-02.png",
    "images/stage-3-event-03.png",
    "images/stage-3-event-04.png",
    "images/stage-3-event-05.png",
    "images/stage-3-event-06.png",
    "images/stage-3-event-07.png",
    "images/stage-3-event-08.png",
    "images/stage-3-event-09.png",
    "images/stage-3-event-10.png",
    "images/stage-3-event-11.png"
  ],
  4: [
    "images/stage-4-event-01.png",
    "images/stage-4-event-02.png",
    "images/stage-4-event-03.png",
    "images/stage-4-event-04.png",
    "images/stage-4-event-05.png",
    "images/stage-4-event-06.png",
    "images/stage-4-event-07.png",
    "images/stage-4-event-08.png",
    "images/stage-4-event-09.png",
    "images/stage-4-event-10.png",
    "images/stage-4-event-11.png"
  ],
  5: [
    "images/stage-5-event-01.png",
    "images/stage-5-event-02.png",
    "images/stage-5-event-03.png",
    "images/stage-5-event-04.png",
    "images/stage-5-event-05.png",
    "images/stage-5-event-06.png",
    "images/stage-5-event-07.png",
    "images/stage-5-event-08.png",
    "images/stage-5-event-09.png",
    "images/stage-5-event-10.png",
    "images/stage-5-event-11.png"
  ],
  6: [
    "images/stage-6-event-01.png",
    "images/stage-6-event-02.png",
    "images/stage-6-event-03.png",
    "images/stage-6-event-04.png",
    "images/stage-6-event-05.png",
    "images/stage-6-event-06.png",
    "images/stage-6-event-07.png",
    "images/stage-6-event-08.png",
    "images/stage-6-event-09.png",
    "images/stage-6-event-10.png",
    "images/stage-6-event-11.png"
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
  1: getAssetPath("images/pac-bo-stage-1.png"),
  2: getAssetPath("images/pac-bo-stage-2.png"),
  3: getAssetPath("images/pac-bo-stage-3.png"),
  4: getAssetPath("images/pac-bo-stage-4.png"),
  5: getAssetPath("images/pac-bo-stage-5.png"),
  6: getAssetPath("images/pac-bo-stage-6.png")
};

const stage1Questions = [
  makeQuestion("Đối tượng môn học", "Môn Lịch sử Đảng chủ yếu nghiên cứu điều gì?", ["Quá trình ra đời, lãnh đạo và phát triển của Đảng", "Tiểu sử các vua và triều đại phong kiến Việt Nam", "Lịch sử văn học và phong tục Việt Nam", "Lịch sử thế giới cận hiện đại toàn cầu"], 0, "Môn học tập trung vào quá trình hình thành, đường lối và vai trò lãnh đạo của Đảng."),
  makeQuestion("Bối cảnh thuộc địa", "Cuối thế kỷ XIX, xã hội Việt Nam biến đổi sâu sắc vì nguyên nhân nào?", ["Triều đình tự cải cách thành công toàn diện", "Thực dân Pháp xâm lược và thống trị", "Đông Nam Á lập một nhà nước chung", "Việt Nam đã công nghiệp hóa xong"], 1, "Sự thống trị của Pháp làm thay đổi cơ cấu xã hội và đặt ra yêu cầu giải phóng dân tộc."),
  makeQuestion("Khủng hoảng cứu nước", "Các phong trào yêu nước đầu thế kỷ XX thất bại chủ yếu do đâu?", ["Thiếu tinh thần chống ngoại xâm trong cả nước", "Không có người dân tham gia đấu tranh", "Thiếu đường lối và lực lượng lãnh đạo phù hợp", "Không còn mâu thuẫn dân tộc gay gắt"], 2, "Phong trào yêu nước rất đáng trân trọng nhưng chưa giải quyết được khủng hoảng đường lối."),
  makeQuestion("Nguyễn Ái Quốc", "Điểm mới trong con đường cứu nước của Nguyễn Ái Quốc là gì?", ["Dựa hẳn vào cải lương thuộc địa", "Khôi phục chế độ quân chủ phong kiến cũ", "Chỉ vận động trong tầng lớp quan lại", "Gắn độc lập dân tộc với cách mạng vô sản"], 3, "Nguyễn Ái Quốc tìm thấy con đường cứu nước theo khuynh hướng cách mạng vô sản."),
  makeQuestion("Tổ chức tiền thân", "Các tổ chức cộng sản ra đời năm 1929 cho thấy điều gì?", ["Phong trào cách mạng cần thống nhất tổ chức", "Phong trào công nhân đã chấm dứt hoàn toàn trên cả nước", "Đất nước đã giành độc lập dân tộc", "Không cần chính đảng lãnh đạo cách mạng"], 0, "Các tổ chức cộng sản phản ánh sự phát triển của khuynh hướng vô sản và yêu cầu hợp nhất."),
  makeQuestion("Thành lập Đảng", "Đảng Cộng sản Việt Nam ra đời vào thời điểm nào?", ["19 tháng 8 năm 1945", "3 tháng 2 năm 1930", "2 tháng 9 năm 1945", "30 tháng 4 năm 1975"], 1, "Ngày 3/2/1930 gắn với Hội nghị hợp nhất các tổ chức cộng sản."),
  makeQuestion("Cương lĩnh đầu tiên", "Cương lĩnh chính trị đầu tiên đặt nhiệm vụ trung tâm nào?", ["Phát triển thương mại trong khuôn khổ thuộc địa", "Tách cách mạng Việt Nam khỏi phong trào thế giới", "Giải phóng dân tộc và bảo vệ quyền lợi nhân dân", "Xóa bỏ mọi hình thức đấu tranh chính trị"], 2, "Cương lĩnh nêu rõ nhiệm vụ giải phóng dân tộc gắn với quyền lợi của nhân dân."),
  makeQuestion("Ý nghĩa ra đời", "Ý nghĩa lớn nhất của việc Đảng ra đời là gì?", ["Làm Việt Nam công nghiệp hóa ngay lập tức", "Kết thúc mọi cuộc chiến tranh trên thế giới", "Thay thế toàn bộ các tổ chức xã hội", "Chấm dứt khủng hoảng về đường lối cứu nước"], 3, "Đảng ra đời tạo lực lượng lãnh đạo thống nhất cho cách mạng Việt Nam."),
  makeQuestion("Phương pháp học", "Khi học Lịch sử Đảng, cách tiếp cận nào phù hợp nhất?", ["Gắn sự kiện với bối cảnh và kết quả", "Chỉ học thuộc các ngày tháng tiêu biểu", "Chỉ ghi nhớ tên văn kiện quan trọng", "Chỉ quan tâm đến sự kiện quân sự"], 0, "Hiểu lịch sử cần đặt sự kiện trong bối cảnh và tiến trình vận động."),
  makeQuestion("Tổng kết chặng 1", "Đảng ra đời là kết quả của sự kết hợp nào?", ["Chỉ giữa phong trào nông dân và sĩ phu", "Mác - Lênin, công nhân và yêu nước", "Hoạt động hành chính của triều đình", "Một biến cố ngẫu nhiên trong xã hội"], 1, "Đảng ra đời từ yêu cầu khách quan và sự chuẩn bị về tư tưởng, chính trị, tổ chức.")
];

const stage2Questions = [
  makeQuestion("Cao trào 1930-1931", "Đỉnh cao tiêu biểu của phong trào 1930-1931 là sự kiện nào?", ["Phong trào Đông Du", "Chiến dịch Biên giới", "Xô viết Nghệ - Tĩnh", "Tổng tiến công Mậu Thân"], 2, "Xô viết Nghệ - Tĩnh là đỉnh cao tiêu biểu của cao trào cách mạng đầu tiên."),
  makeQuestion("Luận cương 1930", "Luận cương chính trị tháng 10/1930 nhấn mạnh nội dung nào?", ["Chỉ phát triển giáo dục tư thục lâu dài", "Hòa hoãn lâu dài với chính quyền thực dân", "Không cần tổ chức Đảng trong quần chúng", "Đấu tranh chống phong kiến và đế quốc"], 3, "Luận cương bổ sung nhận thức về cách mạng Đông Dương trong bối cảnh lúc bấy giờ."),
  makeQuestion("Mặt trận dân chủ", "Phong trào dân chủ 1936-1939 nêu mục tiêu trước mắt nào?", ["Dân sinh, dân chủ, cơm áo, hòa bình", "Từ bỏ mọi hình thức mặt trận", "Đánh nhanh bằng lực lượng ngoài nước", "Xây dựng quân đội chính quy ngay"], 0, "Đảng linh hoạt chuyển hướng sách lược để tập hợp quần chúng rộng rãi."),
  makeQuestion("Chuyển hướng chiến lược", "Từ năm 1939, nhiệm vụ hàng đầu được Đảng đặt ra là gì?", ["Phát triển du lịch thuộc địa", "Giải phóng dân tộc", "Mở rộng độc quyền kinh tế", "Chỉ cải cách văn hóa"], 1, "Chiến tranh thế giới thứ hai làm nhiệm vụ độc lập dân tộc trở nên cấp bách."),
  makeQuestion("Trung ương 8", "Hội nghị Trung ương 8 năm 1941 gắn với quyết định nào?", ["Ký Hiệp định Giơnevơ", "Phát động đổi mới kinh tế", "Thành lập Mặt trận Việt Minh", "Thống nhất đất nước về nhà nước"], 2, "Hội nghị hoàn chỉnh chủ trương giải phóng dân tộc và lập Mặt trận Việt Minh."),
  makeQuestion("Việt Minh", "Vai trò chính của Mặt trận Việt Minh là gì?", ["Chỉ đại diện một ngành kinh tế thuộc địa", "Tổ chức bầu cử nghị viện Pháp ở Đông Dương", "Thay thế mọi chính quyền sau năm 1975", "Tập hợp lực lượng yêu nước giành độc lập"], 3, "Việt Minh là hình thức mặt trận phù hợp để chuẩn bị tổng khởi nghĩa."),
  makeQuestion("Thời cơ 1945", "Thời cơ Tổng khởi nghĩa tháng Tám xuất hiện trực tiếp khi nào?", ["Nhật đầu hàng Đồng minh", "Mỹ rút quân khỏi Việt Nam", "Pháp ký Hiệp định Pari", "Đổi mới được khởi xướng"], 0, "Nhật đầu hàng tạo khoảng trống quyền lực để cách mạng chớp thời cơ."),
  makeQuestion("Tổng khởi nghĩa", "Yếu tố nào quyết định thắng lợi của Cách mạng tháng Tám?", ["Do một nước ngoài làm thay toàn bộ", "Đường lối đúng và sức mạnh toàn dân", "Không cần chuẩn bị lực lượng lâu dài", "Chỉ nhờ may mắn quân sự nhất thời"], 1, "Thắng lợi đến từ sự lãnh đạo kịp thời và quá trình chuẩn bị lâu dài."),
  makeQuestion("Tuyên ngôn độc lập", "Ngày 2/9/1945 gắn với sự kiện nào?", ["Ký Hiệp định Pari về Việt Nam", "Thành lập Mặt trận Việt Minh toàn quốc ở Pác Bó", "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn độc lập", "Mở Chiến dịch Hồ Chí Minh lịch sử"], 2, "Ngày 2/9/1945 mở đầu kỷ nguyên độc lập của dân tộc Việt Nam."),
  makeQuestion("Bài học 1945", "Bài học nổi bật từ thắng lợi năm 1945 là gì?", ["Chỉ dựa vào đấu tranh nghị trường hợp pháp", "Không cần tổ chức chính trị của quần chúng", "Tách độc lập dân tộc khỏi sức dân", "Đoàn kết dân tộc và nắm bắt thời cơ"], 3, "Đảng biết tập hợp lực lượng, chuẩn bị và hành động khi thời cơ đến.")
];

const stage3Questions = [
  makeQuestion("Tình thế sau 1945", "Sau Cách mạng tháng Tám, nước ta đứng trước tình thế nào?", ["Ngàn cân treo sợi tóc", "Không còn khó khăn lớn", "Đã công nghiệp hóa xong", "Không còn thù trong giặc ngoài"], 0, "Chính quyền non trẻ phải đối mặt với nhiều khó khăn nghiêm trọng."),
  makeQuestion("Bảo vệ chính quyền", "Một nhiệm vụ cấp bách sau năm 1945 là gì?", ["Giải tán lực lượng tự vệ cách mạng ở địa phương", "Củng cố chính quyền và chăm lo đời sống", "Ngừng mọi hoạt động ngoại giao", "Từ bỏ mục tiêu độc lập dân tộc"], 1, "Đảng lãnh đạo xây dựng nhà nước mới, chống giặc đói, giặc dốt và ngoại xâm."),
  makeQuestion("Toàn quốc kháng chiến", "Lời kêu gọi Toàn quốc kháng chiến được phát ra khi nào?", ["3 tháng 2 năm 1930", "2 tháng 9 năm 1945", "19 tháng 12 năm 1946", "30 tháng 4 năm 1975"], 2, "Khi hòa hoãn không còn khả năng, toàn dân bước vào kháng chiến chống Pháp."),
  makeQuestion("Đường lối kháng chiến", "Đường lối kháng chiến chống Pháp được khái quát ra sao?", ["Đánh nhanh bằng lực lượng ngoài nước hỗ trợ", "Chỉ đấu tranh kinh tế bí mật", "Không cần xây dựng hậu phương", "Toàn dân, toàn diện, trường kỳ, tự lực"], 3, "Đường lối này phù hợp tương quan lực lượng và phát huy sức mạnh toàn dân."),
  makeQuestion("Việt Bắc 1947", "Chiến thắng Việt Bắc Thu - Đông 1947 có ý nghĩa gì?", ["Làm thất bại kế hoạch đánh nhanh của Pháp", "Kết thúc hoàn toàn chiến tranh ở Đông Dương", "Mở đầu công cuộc đổi mới đất nước", "Thành lập nước Việt Nam thống nhất"], 0, "Chiến thắng bảo vệ căn cứ địa và cơ quan đầu não kháng chiến."),
  makeQuestion("Biên giới 1950", "Kết quả nổi bật của Chiến dịch Biên giới 1950 là gì?", ["Ký Hiệp định Pari về chấm dứt chiến tranh", "Khai thông biên giới và giành thế chủ động", "Xóa bỏ chính quyền cách mạng ở toàn căn cứ địa", "Thống nhất đất nước ngay lập tức"], 1, "Chiến dịch Biên giới tạo bước chuyển quan trọng cho kháng chiến chống Pháp."),
  makeQuestion("Đại hội II", "Đại hội II của Đảng năm 1951 có ý nghĩa nào?", ["Tuyên bố giải thể Đảng trong kháng chiến", "Kết thúc thời kỳ đổi mới đất nước", "Đưa Đảng ra hoạt động công khai", "Thành lập Mặt trận Việt Minh mới"], 2, "Đại hội củng cố tổ chức và đường lối lãnh đạo kháng chiến, kiến quốc."),
  makeQuestion("Điện Biên Phủ", "Chiến thắng Điện Biên Phủ năm 1954 tạo cơ sở cho sự kiện nào?", ["Cách mạng tháng Tám", "Đại hội VI của Đảng", "Chiến dịch Hồ Chí Minh", "Ký Hiệp định Giơnevơ"], 3, "Điện Biên Phủ là thắng lợi quân sự quyết định trong kháng chiến chống Pháp."),
  makeQuestion("Hiệp định Giơnevơ", "Hiệp định Giơnevơ năm 1954 công nhận điều gì?", ["Các quyền dân tộc cơ bản của Việt Nam", "Việt Nam là thuộc địa lâu dài của Pháp", "Miền Nam tách khỏi Việt Nam vĩnh viễn", "Không có lực lượng nước ngoài rút quân"], 0, "Hiệp định công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ."),
  makeQuestion("Bài học chống Pháp", "Bài học lớn của kháng chiến chống Pháp là gì?", ["Chỉ dựa vào viện trợ bên ngoài", "Phát huy sức mạnh toàn dân", "Không cần hậu phương kháng chiến", "Không cần hoạt động ngoại giao"], 1, "Thắng lợi đến từ đường lối đúng và sự kết hợp quân sự, chính trị, ngoại giao.")
];

const stage4Questions = [
  makeQuestion("Hai nhiệm vụ", "Sau năm 1954, cách mạng Việt Nam thực hiện nhiệm vụ nào?", ["Chỉ phát triển thương mại ở các đô thị lớn", "Từ bỏ mục tiêu thống nhất đất nước", "Xây dựng miền Bắc và giải phóng miền Nam", "Chỉ làm cách mạng văn hóa ở miền Bắc"], 2, "Đất nước tạm thời chia cắt nên hai nhiệm vụ chiến lược gắn bó chặt chẽ."),
  makeQuestion("Miền Bắc", "Trong kháng chiến chống Mỹ, miền Bắc giữ vai trò gì?", ["Khu vực trung lập ngoài cuộc", "Thị trường tiêu thụ chính", "Không có vai trò chính trị", "Hậu phương lớn của cả nước"], 3, "Miền Bắc vừa xây dựng CNXH vừa chi viện cho tiền tuyến miền Nam."),
  makeQuestion("Miền Nam", "Nhiệm vụ trực tiếp của cách mạng miền Nam sau 1954 là gì?", ["Đấu tranh chống thực dân mới, tiến tới giải phóng", "Xây dựng nền quân chủ mới ở miền Nam lâu dài", "Từ bỏ đấu tranh chính trị và hòa bình", "Chỉ phát triển du lịch địa phương"], 0, "Cách mạng miền Nam kết hợp đấu tranh chính trị, quân sự và binh vận."),
  makeQuestion("Đồng khởi", "Phong trào Đồng khởi 1959-1960 đánh dấu chuyển biến nào?", ["Kết thúc hoàn toàn chiến tranh Việt Nam", "Từ giữ gìn lực lượng sang thế tiến công", "Mở đầu công cuộc đổi mới kinh tế", "Thành lập Đảng Cộng sản Việt Nam"], 1, "Đồng khởi tạo thế phát triển mới cho cách mạng miền Nam."),
  makeQuestion("Mặt trận giải phóng", "Mặt trận Dân tộc Giải phóng miền Nam ra đời nhằm mục tiêu gì?", ["Tổ chức xuất khẩu nông sản ở miền Nam", "Thay thế các tổ chức quốc tế ở toàn Đông Dương", "Tập hợp lực lượng chống Mỹ và chính quyền Sài Gòn", "Ngừng đấu tranh thống nhất đất nước"], 2, "Mặt trận tập hợp rộng rãi các lực lượng yêu nước ở miền Nam."),
  makeQuestion("Chiến tranh đặc biệt", "Thắng lợi nào góp phần làm phá sản 'Chiến tranh đặc biệt'?", ["Chiến dịch Biên giới năm 1950", "Chiến thắng Việt Bắc năm 1947", "Đường lối đổi mới năm 1986", "Ấp Bắc và phá ấp chiến lược"], 3, "Các thắng lợi ở miền Nam chứng minh khả năng đánh bại chiến lược của Mỹ."),
  makeQuestion("Mậu Thân 1968", "Tổng tiến công Mậu Thân 1968 có tác động lớn nào?", ["Làm Mỹ xuống thang chiến tranh", "Kết thúc ngay chiến tranh Việt Nam", "Thành lập Liên hợp quốc mới", "Mở đầu Cách mạng tháng Tám"], 0, "Mậu Thân tạo bước ngoặt lớn về chính trị và ngoại giao."),
  makeQuestion("Hiệp định Pari", "Hiệp định Pari năm 1973 có nội dung quan trọng nào?", ["Pháp trở lại Đông Dương kiểm soát Việt Nam", "Mỹ rút quân và tôn trọng độc lập Việt Nam", "Việt Nam từ bỏ thống nhất đất nước", "Miền Bắc giải tán chính quyền cách mạng"], 1, "Hiệp định tạo điều kiện chiến lược để tiến tới giải phóng miền Nam."),
  makeQuestion("Chiến dịch Hồ Chí Minh", "Chiến dịch Hồ Chí Minh năm 1975 kết thúc bằng sự kiện nào?", ["Ký Hiệp định Giơnevơ về Đông Dương", "Thành lập Đảng Cộng sản Việt Nam", "Giải phóng Sài Gòn, thống nhất đất nước", "Mở đầu kháng chiến chống thực dân Pháp"], 2, "Ngày 30/4/1975 là mốc thắng lợi hoàn toàn của cuộc kháng chiến chống Mỹ."),
  makeQuestion("Bài học chống Mỹ", "Nhân tố quyết định thắng lợi giai đoạn 1954-1975 là gì?", ["Chỉ do ưu thế vũ khí hiện đại từ bên ngoài", "Không cần hậu phương miền Bắc trong chiến tranh", "Không có nhân dân tham gia đấu tranh", "Sự lãnh đạo của Đảng và đại đoàn kết dân tộc"], 3, "Thắng lợi đến từ sự lãnh đạo đúng đắn và sức mạnh của cả dân tộc.")
];

const stage5Questions = [
  makeQuestion("Sau thống nhất", "Sau năm 1975, nhiệm vụ lớn của cả nước là gì?", ["Khắc phục hậu quả chiến tranh và xây dựng đất nước", "Chia cắt đất nước lâu dài thành hai miền riêng biệt", "Ngừng phát triển kinh tế và xã hội", "Từ bỏ mục tiêu độc lập dân tộc"], 0, "Sau đại thắng 1975, cả nước bước vào thời kỳ xây dựng trong nhiều khó khăn."),
  makeQuestion("Tổng tuyển cử 1976", "Cuộc Tổng tuyển cử năm 1976 có ý nghĩa gì?", ["Mở đầu kháng chiến chống Pháp lần hai", "Hoàn thành thống nhất về mặt nhà nước", "Kết thúc Cách mạng tháng Tám năm 1945", "Thành lập Mặt trận Việt Minh toàn quốc"], 1, "Tổng tuyển cử bầu Quốc hội chung của nước Việt Nam thống nhất."),
  makeQuestion("Tên nước", "Từ năm 1976, tên nước chính thức của Việt Nam là gì?", ["Việt Nam Dân chủ Cộng hòa thống nhất", "Liên bang Đông Dương độc lập", "Cộng hòa xã hội chủ nghĩa Việt Nam", "Quốc gia Việt Nam thống nhất"], 2, "Quốc hội khóa VI quyết định tên nước Cộng hòa xã hội chủ nghĩa Việt Nam."),
  makeQuestion("Khó khăn kinh tế", "Một hạn chế lớn của cơ chế bao cấp là gì?", ["Tạo cạnh tranh thị trường mạnh", "Làm xuất khẩu tăng nhanh", "Không ảnh hưởng đời sống", "Kìm hãm sản xuất và lưu thông"], 3, "Cơ chế quản lý tập trung quan liêu bao cấp bộc lộ nhiều hạn chế."),
  makeQuestion("Bảo vệ biên giới", "Cuối thập niên 1970, Việt Nam phải chú trọng nhiệm vụ nào?", ["Bảo vệ biên giới và chủ quyền Tổ quốc", "Ngừng xây dựng quốc phòng trong cả nước", "Chỉ tập trung hoạt động lễ hội địa phương", "Từ bỏ chủ quyền lãnh thổ quốc gia"], 0, "Đất nước vừa xây dựng sau chiến tranh vừa phải bảo vệ chủ quyền."),
  makeQuestion("Tìm tòi cơ chế mới", "Các tìm tòi đổi mới trước Đại hội VI nhằm giải quyết vấn đề gì?", ["Khôi phục chế độ thuộc địa ở Việt Nam", "Tháo gỡ khó khăn trong sản xuất", "Xóa bỏ sản xuất hàng hóa trong xã hội", "Ngừng lưu thông hàng hóa trên thị trường"], 1, "Thực tiễn đặt ra yêu cầu đổi mới tư duy và cơ chế quản lý."),
  makeQuestion("Đại hội VI", "Đại hội VI năm 1986 được xem là mốc nào?", ["Thành lập Đảng Cộng sản Việt Nam", "Giải phóng miền Nam thống nhất đất nước", "Khởi xướng công cuộc đổi mới", "Ký Hiệp định Giơnevơ về Đông Dương"], 2, "Đại hội VI đánh dấu bước ngoặt đổi mới toàn diện, trước hết là kinh tế."),
  makeQuestion("Quan điểm đổi mới", "Hiểu đúng về đổi mới năm 1986 là gì?", ["Từ bỏ hoàn toàn con đường đã chọn", "Chỉ đổi tên một số tổ chức chính trị", "Không liên quan đến đời sống của nhân dân", "Đổi mới nhưng giữ mục tiêu độc lập và CNXH"], 3, "Đổi mới nhằm phát triển đất nước và giữ vững định hướng xã hội chủ nghĩa."),
  makeQuestion("Bài học thực tiễn", "Bài học quan trọng từ giai đoạn 1975-1986 là gì?", ["Xuất phát từ thực tiễn đất nước", "Chỉ cần ý chí chủ quan trong lãnh đạo", "Không cần tổng kết thực tiễn xã hội", "Đóng cửa hoàn toàn với thế giới"], 0, "Thực tiễn khó khăn giúp Đảng rút ra yêu cầu đổi mới tư duy."),
  makeQuestion("Lối ra 1986", "Ý nghĩa của giai đoạn 1975-1986 là gì?", ["Không liên quan đến công cuộc đổi mới đất nước", "Chuẩn bị nhận thức cho đường lối đổi mới", "Chỉ có ý nghĩa quân sự trong lịch sử", "Là thời kỳ không cần nghiên cứu"], 1, "Giai đoạn này tạo cơ sở thực tiễn và nhận thức cho công cuộc đổi mới.")
];

const stage6Questions = [
  makeQuestion("Đổi mới kinh tế", "Trọng tâm đổi mới những năm đầu sau Đại hội VI là lĩnh vực nào?", ["Văn học", "Thể thao", "Kinh tế", "Thiên văn"], 2, "Đổi mới kinh tế là khâu đột phá để tháo gỡ khủng hoảng."),
  makeQuestion("Kinh tế thị trường", "Kinh tế thị trường định hướng XHCN ở Việt Nam nhấn mạnh điều gì?", ["Bỏ vai trò quản lý của Nhà nước", "Quay lại cơ chế bao cấp toàn diện", "Chỉ giữ một thành phần kinh tế nhà nước", "Thị trường gắn với quản lý của Nhà nước"], 3, "Mô hình này vận dụng kinh tế thị trường trong định hướng phát triển của Việt Nam."),
  makeQuestion("Công nghiệp hóa", "Công nghiệp hóa, hiện đại hóa hướng tới mục tiêu nào?", ["Tạo nền tảng kỹ thuật cho phát triển", "Giảm vai trò khoa học công nghệ hiện đại", "Xóa bỏ sản xuất hiện đại trong công nghiệp", "Chỉ phát triển tự cung tự cấp"], 0, "Công nghiệp hóa gắn với năng suất, chất lượng và sức cạnh tranh."),
  makeQuestion("Hội nhập quốc tế", "Đối ngoại thời kỳ đổi mới nhấn mạnh phương châm nào?", ["Tự cô lập hoàn toàn với thế giới", "Độc lập, tự chủ, đa phương hóa", "Chỉ quan hệ với một nước duy nhất", "Không cần hợp tác kinh tế quốc tế"], 1, "Hội nhập giúp mở rộng nguồn lực phát triển và giữ vững lợi ích quốc gia."),
  makeQuestion("Xây dựng Đảng", "Trong thời kỳ đổi mới, xây dựng Đảng có ý nghĩa gì?", ["Không còn cần thiết trong lãnh đạo", "Chỉ là việc hình thức bên ngoài tổ chức", "Nâng cao năng lực lãnh đạo của Đảng", "Chỉ liên quan kinh tế tư nhân"], 2, "Đảng phải thường xuyên tự đổi mới, tự chỉnh đốn để đáp ứng yêu cầu mới."),
  makeQuestion("Nhà nước pháp quyền", "Nhà nước pháp quyền XHCN Việt Nam nhấn mạnh điều gì?", ["Loại bỏ vai trò pháp luật trong xã hội", "Tập trung quyền lực vào một cá nhân", "Không cần kiểm soát quyền lực nhà nước", "Quản lý xã hội bằng pháp luật"], 3, "Nhà nước pháp quyền đặt pháp luật và quyền làm chủ của nhân dân ở trung tâm."),
  makeQuestion("Văn hóa", "Quan điểm của Đảng về văn hóa trong đổi mới là gì?", ["Văn hóa là nền tảng tinh thần xã hội", "Văn hóa không liên quan phát triển đất nước", "Chỉ coi văn hóa là hoạt động giải trí", "Tách văn hóa khỏi sự phát triển con người"], 0, "Văn hóa góp phần xây dựng con người và sức mạnh mềm của đất nước."),
  makeQuestion("Thành tựu đổi mới", "Một thành tựu nổi bật của công cuộc đổi mới là gì?", ["Việt Nam mất độc lập trên trường quốc tế", "Đời sống cải thiện, vị thế quốc tế nâng cao", "Kinh tế không có chuyển biến đáng kể", "Không còn quan hệ quốc tế với bên ngoài"], 1, "Đổi mới tạo chuyển biến trên nhiều lĩnh vực của đời sống xã hội."),
  makeQuestion("Thách thức mới", "Một thách thức trong quá trình đổi mới và hội nhập là gì?", ["Không còn bất kỳ khó khăn nào", "Không cần đổi mới tiếp trong phát triển", "Nguy cơ tụt hậu và vấn đề quản trị", "Không cần quản trị quốc gia hiện đại"], 2, "Nhận diện thách thức giúp tiếp tục hoàn thiện đường lối phát triển."),
  makeQuestion("Bài học đổi mới", "Bài học xuyên suốt của công cuộc đổi mới là gì?", ["Từ bỏ thực tiễn đất nước khi phát triển", "Chỉ sao chép mô hình bên ngoài máy móc", "Không cần nhân dân tham gia xây dựng", "Kiên định mục tiêu và sáng tạo cách làm"], 3, "Đổi mới thành công nhờ kết hợp kiên định nguyên tắc với sáng tạo thực tiễn.")
];

export const lessonStages = [
  {
    id: 1,
    title: "Chặng 1 - Đảng Cộng sản Việt Nam ra đời",
    objective: "Hiểu bối cảnh lịch sử, vai trò của Nguyễn Ái Quốc và ý nghĩa thành lập Đảng năm 1930.",
    landmark: "Cửa hang Pác Bó",
    theme: "mountain-cave",
    backgroundImage: stageBackgroundImages[1],
    questions: stage1Questions
  },
  {
    id: 2,
    title: "Chặng 2 - Lãnh đạo đấu tranh giành chính quyền (1930-1945)",
    objective: "Nắm các cao trào cách mạng, chủ trương giải phóng dân tộc và thắng lợi Cách mạng tháng Tám.",
    landmark: "Đường cách mạng",
    theme: "revolution-road",
    backgroundImage: stageBackgroundImages[2],
    questions: stage2Questions
  },
  {
    id: 3,
    title: "Chặng 3 - Kháng chiến chống thực dân Pháp (1945-1954)",
    objective: "Hiểu đường lối kháng chiến toàn dân, toàn diện và ý nghĩa Điện Biên Phủ - Giơnevơ.",
    landmark: "Căn cứ Việt Bắc",
    theme: "resistance-base",
    backgroundImage: stageBackgroundImages[3],
    questions: stage3Questions
  },
  {
    id: 4,
    title: "Chặng 4 - Kháng chiến chống Mỹ, thống nhất đất nước (1954-1975)",
    objective: "Nắm hai nhiệm vụ chiến lược, vai trò hậu phương miền Bắc và thắng lợi mùa Xuân 1975.",
    landmark: "Đường Trường Sơn",
    theme: "unity-road",
    backgroundImage: stageBackgroundImages[4],
    questions: stage4Questions
  },
  {
    id: 5,
    title: "Chặng 5 - Cả nước xây dựng CNXH và tìm tòi đổi mới (1975-1986)",
    objective: "Hiểu quá trình khắc phục hậu quả chiến tranh, thống nhất nhà nước và yêu cầu đổi mới.",
    landmark: "Công trường dựng xây",
    theme: "reconstruction",
    backgroundImage: stageBackgroundImages[5],
    questions: stage5Questions
  },
  {
    id: 6,
    title: "Chặng 6 - Công cuộc đổi mới và hội nhập (1986 đến nay)",
    objective: "Nắm đường lối đổi mới, hội nhập quốc tế, thành tựu và bài học phát triển đất nước.",
    landmark: "Cánh cửa hội nhập",
    theme: "renovation",
    backgroundImage: stageBackgroundImages[6],
    questions: stage6Questions
  }
];

export const mazeLayouts = {
  1: createMazeLayout(1, [
    "Bệ đá khởi đầu",
    "Bối cảnh thuộc địa",
    "Khủng hoảng cứu nước",
    "Dấu chân Nguyễn Ái Quốc",
    "Ánh sáng Mác - Lênin",
    "Tổ chức tiền thân",
    "Hội nghị hợp nhất",
    "Cương lĩnh đầu tiên",
    "Bước ngoặt lịch sử",
    "Bài học mở đầu",
    "Lối ra năm 1930"
  ]),
  2: createMazeLayout(2, [
    "Cổng 1930",
    "Xô viết Nghệ - Tĩnh",
    "Luận cương chính trị",
    "Mặt trận dân chủ",
    "Chuyển hướng chiến lược",
    "Hội nghị Trung ương 8",
    "Mặt trận Việt Minh",
    "Thời cơ tháng Tám",
    "Tổng khởi nghĩa",
    "Tuyên ngôn độc lập",
    "Lối ra độc lập"
  ]),
  3: createMazeLayout(3, [
    "Chính quyền non trẻ",
    "Giặc đói giặc dốt",
    "Toàn quốc kháng chiến",
    "Đường lối kháng chiến",
    "Căn cứ Việt Bắc",
    "Chiến dịch Biên giới",
    "Đại hội II",
    "Điện Biên Phủ",
    "Hiệp định Giơnevơ",
    "Bài học kháng chiến",
    "Lối ra hòa bình"
  ]),
  4: createMazeLayout(4, [
    "Đất nước chia cắt",
    "Miền Bắc hậu phương",
    "Miền Nam tiền tuyến",
    "Phong trào Đồng khởi",
    "Mặt trận giải phóng",
    "Đánh bại chiến lược Mỹ",
    "Mậu Thân 1968",
    "Hiệp định Pari",
    "Chiến dịch Hồ Chí Minh",
    "Đại thắng mùa Xuân",
    "Lối ra thống nhất"
  ]),
  5: createMazeLayout(5, [
    "Sau ngày thống nhất",
    "Tổng tuyển cử 1976",
    "Tên nước mới",
    "Khó khăn kinh tế",
    "Bảo vệ biên giới",
    "Tìm tòi cơ chế mới",
    "Đại hội VI",
    "Tư duy đổi mới",
    "Bài học thực tiễn",
    "Chuẩn bị đổi mới",
    "Lối ra 1986"
  ]),
  6: createMazeLayout(6, [
    "Cửa đổi mới",
    "Kinh tế thị trường",
    "Công nghiệp hóa",
    "Hội nhập quốc tế",
    "Xây dựng Đảng",
    "Nhà nước pháp quyền",
    "Nền tảng văn hóa",
    "Thành tựu đất nước",
    "Thách thức mới",
    "Bài học đổi mới",
    "Lối ra hội nhập"
  ])
};
