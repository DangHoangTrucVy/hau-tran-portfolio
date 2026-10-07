import React, { createContext, useContext, useMemo, useState } from "react";
import {
  Text as NativeText,
  type TextProps,
} from "react-native";

export type Language = "en" | "vi";

const translations: Record<string, Partial<Record<Language, string>>> = {};

function addTranslation(english: string, vietnamese: string) {
  translations[english] = { en: english, vi: vietnamese };
  translations[vietnamese] = { en: english, vi: vietnamese };
}

[
  ["NAVIGATION", "ĐIỀU HƯỚNG"],
  ["CONTACT", "LIÊN HỆ"],
  ["Overview", "Tổng quan"],
  ["Audio Director / Audio Engineer", "Đạo diễn âm thanh / Kỹ sư âm thanh"],
  ["AUDIO DIRECTOR / AUDIO ENGINEER", "KỸ SƯ ÂM THANH"],
  ["Audio Director /", "Đạo diễn âm thanh /"],
  ["AUDIO ENGINEER", "KỸ SƯ ÂM THANH"],
  ["Music Producer", "Nhà sản xuất âm nhạc"],
  ["MUSIC PRODUCER", "NHÀ SẢN XUẤT ÂM NHẠC"],
  ["Performance", "Biểu diễn"],
  ["PERFORMANCE", "BIỂU DIỄN"],
  ["Workshops & Masterclasses", "Hội thảo & Lớp chuyên sâu"],
  ["WORKSHOPS & MASTERCLASSES", "CÁC BUỔI HỘI THẢO & LỚP CHUYÊN SÂU"],
  ["WORKSHOPS & MASTERCLASSES.", "CÁC BUỔI HỘI THẢO & LỚP CHUYÊN SÂU."],
  ["Workshop", "Hội thảo"],
  ["Engineer", "Kỹ sư âm thanh"],
  ["Producer", "Nhà sản xuất"],
  ["Email", "Email"],
  ["Call", "Gọi điện"],
  ["Facebook", "Facebook"],
  ["Email:", "Email:"],
  ["Phone:", "Điện thoại:"],
  ["Location:", "Địa điểm:"],
  ["Ho Chi Minh City", "Thành phố Hồ Chí Minh"],
  ["All rights reserved.", "Đã đăng ký bản quyền."],
  ["Designed for Sound. Built for Impact.", "Thiết kế cho âm thanh. Tạo nên dấu ấn."],
  ["FEATURED SHOWS", "CHƯƠNG TRÌNH NỔI BẬT"],
  ["OTHER SHOWS", "CÁC CHƯƠNG TRÌNH KHÁC"],
  ["FEATURED COLLABORATIONS", "CÁC DỰ ÁN HỢP TÁC NỔI BẬT"],
  ["RECORDING PROJECT", "DỰ ÁN THU ÂM"],
  ["Recording Project", "Dự án thu âm"],
  ["Record", "Bản thu"],
  ["Tap to view gallery", "Chạm để xem thư viện"],
  ["View Gallery", "Xem thư viện"],
  ["SHOW LESS", "THU GỌN"],
  ["SHOW ALL", "XEM TẤT CẢ"],
  ["Live Sound", "Âm thanh trực tiếp"],
  ["LIVE SOUND", "ÂM THANH TRỰC TIẾP"],
  ["Studio Recording", "Thu âm phòng thu"],
  ["Audio Post-Production", "Hậu kỳ âm thanh"],
  ["Live Sound. Studio Recording. Audio Post-Production .", "Âm thanh trực tiếp. Thu âm phòng thu. Hậu kỳ âm thanh."],
  ["GAME SHOWS", "CHƯƠNG TRÌNH TRUYỀN HÌNH"],
  ["LIVE SHOWS", "CHƯƠNG TRÌNH BIỂU DIỄN"],
  ["JUDGING", "GIÁM KHẢO"],
  ["JUDGE", "GIÁM KHẢO"],
  ["MUSICAL BACKGROUND", "NỀN TẢNG ÂM NHẠC"],
  ["PERFORMANCE & MUSICAL BACKGROUND", "BIỂU DIỄN & KINH NGHIỆM ÂM NHẠC"],
  ["Production Workshop", "Hội thảo sản xuất âm nhạc"],
  ["Live Performance", "Biểu diễn trực tiếp"],
  ["Music Production", "Sản xuất âm nhạc"],
  ["Listen to track", "Nghe bài hát"],
  ["Percussionist", "Nghệ sĩ bộ gõ"],
  ["Percussion Coordinator", "Điều phối bộ gõ"],
  ["Percussion Arranger", "Biên soạn bộ gõ"],
  ["Drummer", "Nghệ sĩ trống"],
  ["Percussionist / Drummer", "Nghệ sĩ bộ gõ / trống"],
  ["Festival", "Lễ hội âm nhạc"],
  ["World Tour", "Chuyến lưu diễn thế giới"],
  ["Special Event", "Sự kiện đặc biệt"],
  ["Live Show", "Chương trình trực tiếp"],
  ["Concert", "Buổi hòa nhạc"],
  ["Orchestra", "Dàn nhạc"],
  ["Music Show", "Chương trình âm nhạc"],
  ["Game Show", "Chương trình trò chơi truyền hình"],
  [
    "I began as a professional musician, finding my way into sound through years spent on stage. Performing taught me that sound should not only be clear and beautiful, but also preserve the artist's spirit and the emotion of each performance. That is why I always begin by listening—to the artist, the space, and the music—so the sound becomes a natural part of the stage.",
    "Xuất phát từ một nhạc công chuyên nghiệp, tôi đến với âm thanh từ những năm tháng đứng trên sân khấu. Trải nghiệm biểu diễn giúp tôi hiểu rằng âm thanh không chỉ cần rõ và đẹp, mà còn phải giữ được tinh thần của người nghệ sĩ và cảm xúc của màn trình diễn. Vì vậy, tôi luôn bắt đầu bằng sự lắng nghe — lắng nghe nghệ sĩ, không gian và âm nhạc — để âm thanh hòa vào sân khấu một cách tự nhiên.",
  ],
  [
    "A selection of projects, events, and sound productions that Tran Hau has worked on.",
    "Một số dự án, sự kiện và chương trình âm thanh mà Trần Hậu đã tham gia thực hiện.",
  ],
  ["BRAND EVENTS", "SỰ KIỆN NHÃN HÀNG"],
  ["PRODUCTION WORKSHOP", "HỘI THẢO SẢN XUẤT ÂM NHẠC"],
  ["LIVE PERFORMANCE", "BIỂU DIỄN TRỰC TIẾP"],
  ["MUSIC PRODUCTION", "SẢN XUẤT ÂM NHẠC"],
  ["PRODUCTION", "SẢN XUẤT ÂM NHẠC"],
  ["PERFORMANCE", "BIỂU DIỄN"],
  ["MASTERCLASS", "LỚP CHUYÊN SÂU"],
  ["AUDIO DIRECTOR /", "ĐẠO DIỄN ÂM THANH /"],
  ["Vietnam Idol", "Thần Tượng Âm Nhạc"],
  ["Vietnam Idol Kids", "Thần Tượng Âm Nhạc Nhí"],
  ["The Voice of Vietnam", "Giọng Hát Việt"],
  ["The Voice Kids of Vietnam", "Giọng Hát Việt Nhí"],
  ["Perfect Duet", "Tuyệt Đỉnh Song Ca"],
  ["Bolero Idol", "Thần Tượng Bolero"],
  ["Celebrity Battle", "Sao Đại Chiến"],
  ["Who Will Become a Star", "Ai Sẽ Thành Sao"],
  ["Who Will Become a Star Kids", "Ai Sẽ Thành Sao Nhí"],
  ["Evergreen Singing", "Tiếng Hát Mãi Xanh"],
  ["The Lyrics Battle", "Sàn Đấu Ca Từ"],
  ["The Voice of Invincibility", "Giọng Ca Bất Bại"],
  ["A Life on Stage", "Sô Diễn Cuộc Đời"],
  ["Legends' Mark", "Dấu Ấn Huyền Thoại"],
  ["United Nations Vesak 2025", "Vesak Liên Hợp Quốc 2025"],
  ["Shopee Food Music Festival", "Đại nhạc hội Shopee Food"],
  ["Sea of Hope 2022", "Biển Của Hy Vọng 2022"],
  ["My Partner Is the Best 2024", "Game Show Người Yêu Tôi Đỉnh Nhất 2024"],
  ["Sketch A Rose in Sai Gon - Hà Anh Tuấn", "Sketch A Rose in Saigon - Ha Anh Tuan"],
  ["Binh Thuan Festival", "Festival Bình Thuận"],
  ["Nha Trang Sea Festival", "Festival Biển Nha Trang"],
  ["Dreamy Cities", "Những Thành Phố Mơ Màng"],
  ["The Phoenix Empire Music Festival", "Đại nhạc hội The Phoenix Empire"],
  ["Hozo Festival", "Hozo Festival"],
  ["Vietnam DJ Festival", "Festival DJ Việt Nam"],
  ["MixWiz Viet Nam", "MixWiz Vietnam"],
  ["© 2025 Trung Kien & Truc Vy.", "© 2025 Trung Kiên & Trúc Vy."],
  ["© 2025 Trung Kien & Truc Vy. All rights reserved.", "© 2025 Trung Kiên & Trúc Vy. Đã đăng ký bản quyền."],
  ["Phone: 0984 123 494", "Điện thoại: 0984 123 494"],
  ["Location: Ho Chi Minh City", "Địa điểm: Thành phố Hồ Chí Minh"],
  ["Email: tranhauaudio@gmail.com", "Email: tranhauaudio@gmail.com"],
  ["2016 • Percussionist", "2016 • Nghệ sĩ bộ gõ"],
  ["2017 • Percussionist", "2017 • Nghệ sĩ bộ gõ"],
  ["2018 • Percussionist", "2018 • Nghệ sĩ bộ gõ"],
  ["2019 • Percussionist", "2019 • Nghệ sĩ bộ gõ"],
  ["2021 • Percussionist / Drummer", "2021 • Nghệ sĩ bộ gõ / trống"],
].forEach(([english, vietnamese]) => addTranslation(english, vietnamese));

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function LanguageProvider({ children }: React.PropsWithChildren) {
  const [language, setLanguage] = useState<Language>("en");
  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

function localizeNode(node: React.ReactNode, language: Language): React.ReactNode {
  if (typeof node !== "string") return node;

  const trimmed = node.trim();
  const meta = trimmed.match(/^(\d{4}(?:-\d{4})?)\s+•\s+(.+)$/);
  const role = meta && translations[meta[2]]?.[language];
  const translation = meta && role
    ? `${meta[1]} • ${role}`
    : translations[trimmed]?.[language];
  if (translation) {
    const leadingWhitespace = node.match(/^\s*/)?.[0] ?? "";
    const trailingWhitespace = node.match(/\s*$/)?.[0] ?? "";
    return `${leadingWhitespace}${translation}${trailingWhitespace}`;
  }

  const phrases = Object.keys(translations).sort(
    (left, right) => right.length - left.length,
  );
  const phrasePattern = new RegExp(
    phrases
      .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|"),
    "gi",
  );

  return node.replace(phrasePattern, (matched) => {
    const exact = translations[matched]?.[language];
    const source = exact
      ? matched
      : phrases.find((phrase) => phrase.toLowerCase() === matched.toLowerCase());
    const localized = exact ?? (source && translations[source]?.[language]);

    if (!localized || matched !== matched.toLocaleUpperCase()) {
      return localized ?? matched;
    }

    return localized.toLocaleUpperCase(language === "vi" ? "vi-VN" : "en-US");
  });
}

export function LocalizedText({ children, ...props }: TextProps) {
  const { language } = useLanguage();
  const childrenArray = React.Children.toArray(children);
  const localizedChildren = childrenArray.map((child) =>
    localizeNode(child, language),
  );

  return <NativeText {...props}>{localizedChildren}</NativeText>;
}
