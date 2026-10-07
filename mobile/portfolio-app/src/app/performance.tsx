import React, { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { COLORS } from "../theme/theme";
import { Image } from "expo-image";
import { LocalizedText as Text, useLanguage } from "../i18n/language";

/* ============================================================
   GAME SHOWS
============================================================ */

const gameShows = [
  ["Thần Tượng Âm Nhạc", "2016 • Percussionist", "VTV3"],
  ["Thần Tượng Âm Nhạc Nhí", "2017 • Percussionist", "VTV3"],
  ["The Remix", "2017 • Percussionist", "VTV3"],
  ["Giọng Hát Việt", "2017 • Percussionist", "VTV3"],
  ["Giọng Hát Việt Nhí", "2017 • Percussionist", "VTV3"],
  ["Tuyệt Đình Song Ca", "2016 • Percussionist", "THVL"],
  ["Thần Tượng Bolero", "2017 • Percussionist", "VTV3"],
  ["Sao Đại Chiến", "2017 • Percussionist", "VTV3"],
  ["Ai Sẽ Thành Sao", "2017 • Percussionist", "THVL"],
  ["Ai Sẽ Thành Sao Nhí", "2017 • Percussionist", "THVL"],
  ["Tiếng Hát Mãi Xanh", "2017 • Percussionist", "HTV"],
  ["Sàn Đấu Ca Từ", "2019 • Percussionist", "HTV7"],
  ["Giọng Ca Bất Bại", "2018 • Percussionist", "HTV7"],
  ["Sô Diễn Cuộc Đời", "2021 • Percussionist / Drummer", "HTV7"],
  ["Dấu Ấn Huyền Thoại", "2021 • Percussionist / Drummer", "HTV7"],
];

/* ============================================================
   LIVE SHOWS
============================================================ */

const liveShows = [
  ["Sketch A Rose in Sai Gon - Hà Anh Tuấn", "Percussionist", "2025"],
  [
    "Hiff - Ho Chi Minh City International Film Festival",
    "Percussionist",
    "2024",
  ],
  ["Festival Bình Thuận", "Percussion Coordinator", "2023"],
  ["Festival Biển Nha Trang", "Percussion Arranger", "2023"],
  ["My Soul 1981 - Mỹ Tâm", "Percussionist", "2023"],
  ["Những Thành Phố Mơ Màng", "Drummer", "2022-2023"],
  ["Live Show Trịnh Thăng Bình", "Drummer", "2022"],
  ["Heineken Aftermovie", "Percussionist", "2022"],
  ["Yamaha Roadtrip", "Drummer", "2021-2022"],
  ["Hội Festival", "Drummer", "2020-2022"],
  ["Đại nhạc hội The Phoenix Empire", "Percussionist", "2020"],
  ["Lumos Festival (France)", "Drummer", "2020"],
  ["Hozo Festival", "Percussionist", "2019"],
  ["Festival Dj VietNam", "Percussion Arranger", "2019"],
  ["Pro Sound Vietnam", "Drummer", "2018-2019"],
  ["Master Ruma Hoà Nhạc - Cambodia", "Percussionist", "2017"],
  ["Live Show Thu Minh Fire Phoenix", "Percussionist", "2016"],
  ["Live Show Noo Phước Thịnh", "Percussionist", "2016"],
];

/* ============================================================
   MAIN SCREEN
============================================================ */

export default function PerformanceScreen() {
  const [openFooter, setOpenFooter] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        <Pressable
          style={styles.logoContainer}
          onPress={() => router.replace("/")}
        >
          <Image
            source={require("../../assets/lo.jpg")}
            style={styles.logoImage}
          />

          <Text style={styles.logoText}>HAU TRAN</Text>
        </Pressable>

        <View style={styles.languages}>
          <Pressable
            style={[styles.langButton, language === "en" && styles.langActive]}
            onPress={() => setLanguage("en")}
          >
            <Text style={styles.langText}>EN</Text>
          </Pressable>

          <Pressable
            style={[styles.langButton, language === "vi" && styles.langActive]}
            onPress={() => setLanguage("vi")}
          >
            <Text style={styles.langText}>VI</Text>
          </Pressable>
        </View>
      </View>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 80 + insets.bottom,
          },
        ]}
      >
        {/* =================================================
            HERO
        ================================================= */}

        <View style={styles.hero}>
          <View style={styles.heroGlow} />

          <Text style={styles.heroTitle}>
            MUSICAL BACKGROUND
            {"\n"}/ PERFORMANCE
          </Text>
        </View>

        {/* =================================================
            GAME SHOWS
        ================================================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GAME SHOWS</Text>

          <View style={styles.table}>
            {gameShows.map(([title, meta, badge], index) => (
              <View
                key={index}
                style={[
                  styles.row,
                  index === gameShows.length - 1 && styles.lastRow,
                ]}
              >
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{title}</Text>

                  <Text style={styles.itemMeta}>{meta}</Text>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* =================================================
            LIVE SHOWS
        ================================================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LIVE SHOWS</Text>

          <View style={styles.table}>
            {liveShows.map(([title, role, year], index) => (
              <View
                key={index}
                style={[
                  styles.row,
                  index === liveShows.length - 1 && styles.lastRow,
                ]}
              >
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{title}</Text>

                  <Text style={styles.itemMeta}>{role}</Text>
                </View>

                <View style={styles.yearBadge}>
                  <Text style={styles.yearText}>{year}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* =================================================
            JUDGING
        ================================================= */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>JUDGING</Text>

          <View style={styles.judgingBox}>
            <Text style={styles.judgingYear}>2024</Text>

            <View>
              <Text style={styles.judgingRole}>JUDGE</Text>

              <Text style={styles.judgingName}>MixWiz Viet Nam</Text>
            </View>
          </View>
        </View>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View style={styles.footer}>
          {/* EMAIL / CALL */}

          <View style={styles.actions}>
            <Pressable
              style={styles.emailButton}
              onPress={() => Linking.openURL("mailto:tranhauaudio@gmail.com")}
            >
              <Ionicons name="mail" size={16} color="#fff" />

              <Text style={styles.actionText}>Email</Text>
            </Pressable>

            <Pressable
              style={styles.callButton}
              onPress={() => Linking.openURL("tel:0984123494")}
            >
              <Ionicons name="call" size={16} color="#fff" />

              <Text style={styles.actionText}>Call</Text>
            </Pressable>
          </View>

          {/* NAVIGATION */}

          <FooterAccordion
            title="NAVIGATION"
            open={openFooter === "nav"}
            onPress={() => setOpenFooter(openFooter === "nav" ? null : "nav")}
          >
            <FooterLink title="Overview" onPress={() => router.push("/")} />

            <FooterLink
              title="Audio Director / Audio Engineer"
              onPress={() => router.push("/audio-engineer")}
            />

            <FooterLink
              title="Music Producer"
              onPress={() => router.push("/music-producer")}
            />

            <FooterLink
              title="Performance"
              onPress={() => router.push("/performance")}
            />

            <FooterLink
              title="Workshops & Masterclasses"
              onPress={() => router.push("/workshops")}
            />
          </FooterAccordion>

          {/* CONTACT */}

          <FooterAccordion
            title="CONTACT"
            open={openFooter === "contact"}
            onPress={() =>
              setOpenFooter(openFooter === "contact" ? null : "contact")
            }
          >
            <Text style={styles.contact}>Email: tranhauaudio@gmail.com</Text>

            <Text style={styles.contact}>Phone: 0984 123 494</Text>

            <Text style={styles.contact}>Location: Ho Chi Minh City</Text>
          </FooterAccordion>

          {/* FACEBOOK */}

          <Pressable
            style={styles.facebook}
            onPress={() =>
              Linking.openURL("https://www.facebook.com/tran.haudrum/")
            }
          >
            <Ionicons name="logo-facebook" size={18} color="#fff" />

            <Text style={styles.facebookText}>Facebook</Text>
          </Pressable>

          {/* COPYRIGHT */}

          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              © 2025 Trung Kien & Truc Vy.{"\n"}
              All rights reserved.
            </Text>

            <Text style={styles.copyrightText}>
              Designed for Sound. Built for Impact.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* =====================================================
          BOTTOM NAV
      ===================================================== */}

      <BottomNav active="Performance" />
    </View>
  );
}

/* ============================================================
   FOOTER ACCORDION
============================================================ */

function FooterAccordion({
  title,
  open,
  onPress,
  children,
}: {
  title: string;
  open: boolean;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.accordion}>
      <Pressable style={styles.accordionHeader} onPress={onPress}>
        <Text style={styles.accordionTitle}>{title}</Text>

        <Text style={styles.accordionIcon}>{open ? "−" : "+"}</Text>
      </Pressable>

      {open && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
}

/* ============================================================
   FOOTER LINK
============================================================ */

function FooterLink({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.footerLink} onPress={onPress}>
      <Text style={styles.footerLinkText}>{title}</Text>
    </Pressable>
  );
}

/* ============================================================
   BOTTOM NAV
============================================================ */

function BottomNav({ active }: { active: string }) {
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      label: "Overview",
      icon: "home-outline",
      route: "/",
    },
    {
      label: "Engineer",
      icon: "options-outline",
      route: "/audio-engineer",
    },
    {
      label: "Producer",
      icon: "disc-outline",
      route: "/music-producer",
    },
    {
      label: "Performance",
      icon: "mic-outline",
      route: "/performance",
    },
    {
      label: "Workshop",
      icon: "school-outline",
      route: "/workshops",
    },
  ] as const;

  return (
    <View
      style={[
        styles.bottomNav,
        {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {tabs.map((tab) => (
        <Pressable
          key={tab.label}
          style={styles.bottomTab}
          onPress={() => router.push(tab.route)}
        >
          <Ionicons
            name={tab.icon}
            size={19}
            color={active === tab.label ? COLORS.primary : "#777"}
          />

          <Text
            style={[
              styles.bottomText,
              active === tab.label && styles.bottomActive,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  /* ========================================================
     HEADER
  ======================================================== */

  header: {
    minHeight: 58,

    paddingHorizontal: 18,

    backgroundColor: COLORS.background,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    zIndex: 100,
    elevation: 5,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoImage: {
    width: 26,
    height: 26,

    borderRadius: 4,

    marginRight: 8,
  },

  logoText: {
    color: COLORS.white,

    fontSize: 18,
    fontWeight: "800",

    letterSpacing: 1,
  },

  languages: {
    flexDirection: "row",
    gap: 4,
  },

  langActive: {
    backgroundColor: COLORS.primary,

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 5,
  },

  langButton: {
    backgroundColor: "#222",

    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 5,
  },

  langText: {
    color: COLORS.white,

    fontSize: 11,
    fontWeight: "700",
  },

  /* ========================================================
     HERO
  ======================================================== */

  hero: {
    minHeight: 190,

    paddingHorizontal: 16,
    paddingVertical: 30,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: COLORS.background,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

    overflow: "hidden",
  },

  heroGlow: {
    position: "absolute",

    width: 380,
    height: 180,

    backgroundColor: "rgba(150,40,10,0.15)",

    transform: [
      {
        rotate: "-10deg",
      },
    ],
  },

  heroTitle: {
    color: COLORS.white,

    fontSize: 26,
    fontWeight: "800",

    textAlign: "center",

    letterSpacing: 1,
    lineHeight: 32,
  },

  /* ========================================================
     SECTIONS
  ======================================================== */

  section: {
    paddingHorizontal: 16,
    marginTop: 30,
  },

  sectionTitle: {
    color: COLORS.white,

    fontSize: 19,
    fontWeight: "800",

    letterSpacing: 0.7,

    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,

    paddingLeft: 10,

    marginBottom: 16,
  },

  /* ========================================================
     TABLE
  ======================================================== */

  table: {
    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 8,

    paddingHorizontal: 16,
  },

  row: {
    minHeight: 67,

    paddingVertical: 13,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 10,
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  itemInfo: {
    flex: 1,
  },

  itemTitle: {
    color: "#ddd",

    fontSize: 13,
    fontWeight: "600",

    lineHeight: 18,
  },

  itemMeta: {
    color: COLORS.muted,

    fontSize: 11,

    marginTop: 3,
  },

  badge: {
    backgroundColor: "#1a0a07",

    borderWidth: 1,
    borderColor: "rgba(255,69,0,0.2)",

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 4,
  },

  badgeText: {
    color: COLORS.primary,

    fontSize: 12,
    fontWeight: "800",
  },

  yearBadge: {
    backgroundColor: "#1a0a07",

    borderWidth: 1,
    borderColor: "rgba(255,69,0,0.2)",

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 4,
  },

  yearText: {
    color: COLORS.primary,

    fontSize: 11,
    fontWeight: "800",
  },

  /* ========================================================
     JUDGING
  ======================================================== */

  judgingBox: {
    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,

    borderRadius: 8,

    padding: 18,

    flexDirection: "row",
    alignItems: "center",

    gap: 20,
  },

  judgingYear: {
    color: COLORS.primary,

    fontSize: 40,
    fontWeight: "900",
  },

  judgingRole: {
    color: COLORS.muted,

    fontSize: 11,

    letterSpacing: 1,
    fontWeight: "700",
  },

  judgingName: {
    color: COLORS.white,

    fontSize: 16,
    fontWeight: "700",

    marginTop: 3,
  },

  /* ========================================================
     FOOTER
  ======================================================== */

  footer: {
    paddingHorizontal: 20,

    paddingTop: 30,
    paddingBottom: 20,

    backgroundColor: COLORS.background,

    marginTop: 30,
  },

  actions: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 25,
  },

  emailButton: {
    flex: 1,

    height: 44,

    backgroundColor: COLORS.primary,

    borderRadius: 6,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",

    gap: 7,
  },

  callButton: {
    flex: 1,

    height: 44,

    backgroundColor: "#161616",

    borderWidth: 1,
    borderColor: "#333",

    borderRadius: 6,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",

    gap: 7,
  },

  actionText: {
    color: COLORS.white,

    fontSize: 13,
    fontWeight: "700",
  },

  /* ========================================================
     ACCORDION
  ======================================================== */

  accordion: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  accordionHeader: {
    minHeight: 50,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  accordionTitle: {
    color: COLORS.white,

    fontSize: 15,
    fontWeight: "700",
  },

  accordionIcon: {
    color: COLORS.primary,

    fontSize: 20,
  },

  accordionContent: {
    paddingBottom: 12,
  },

  footerLink: {
    paddingVertical: 7,
  },

  footerLinkText: {
    color: "#aaa",

    fontSize: 12,
  },

  contact: {
    color: "#aaa",

    fontSize: 12,

    marginBottom: 7,
  },

  /* ========================================================
     FACEBOOK
  ======================================================== */

  facebook: {
    height: 48,

    flexDirection: "row",
    alignItems: "center",

    gap: 8,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  facebookText: {
    color: COLORS.white,

    fontSize: 12,
  },

  /* ========================================================
     COPYRIGHT
  ======================================================== */

  copyright: {
    paddingVertical: 20,

    alignItems: "center",
  },

  copyrightText: {
    color: "#666",

    fontSize: 10,
    lineHeight: 16,

    textAlign: "center",
  },

  /* ========================================================
     BOTTOM NAV
  ======================================================== */

  bottomNav: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: COLORS.surface,

    borderTopWidth: 1,
    borderTopColor: COLORS.border,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    zIndex: 2000,
    elevation: 10,
  },

  bottomTab: {
    flex: 1,

    minHeight: 48,

    alignItems: "center",
    justifyContent: "center",

    gap: 3,
  },

  bottomText: {
    color: "#777",

    fontSize: 9,
  },

  bottomActive: {
    color: COLORS.primary,
  },
});
