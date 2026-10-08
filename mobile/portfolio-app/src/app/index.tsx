import React, { useState } from "react";
import {
  Image,
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
import { LocalizedText as Text, useLanguage } from "../i18n/language";

const COLORS = {
  background: "#0b0b0b",
  header: "#111111",
  card: "#141414",
  border: "#222222",
  white: "#ffffff",
  gray: "#888888",
  lightGray: "#aaaaaa",
  orange: "#ff5722",
};

export default function HomeScreen() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const { language, setLanguage } = useLanguage();

  const toggleSection = (section: string) => {
    setOpenSection(
      openSection === section ? null : section
    );
  };

  return (
    <View style={styles.container}>

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

          <Text style={styles.logoText}>
            HAU TRAN
          </Text>
        </Pressable>

        <View style={styles.languageContainer}>
          <Pressable
            style={[
              styles.languageButton,
              language === "en" && styles.languageActive,
            ]}
            onPress={() => setLanguage("en")}
          >
            <Text style={styles.languageText}>
              EN
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.languageButton,
              language === "vi" && styles.languageActive,
            ]}
            onPress={() => setLanguage("vi")}
          >
            <Text style={styles.languageText}>
              VI
            </Text>
          </Pressable>
        </View>

      </View>

      {/* =====================================================
          MAIN SCROLL
      ===================================================== */}
     <ScrollView
  style={styles.scroll}
  contentContainerStyle={[
    styles.scrollContent,
    {
      paddingBottom: 75 + insets.bottom,
    },
  ]}
  showsVerticalScrollIndicator={false}
>

        {/* =================================================
            HERO
        ================================================= */}
        <View style={styles.heroMenu}>

          <Image
            source={require("../../assets/HAUTRAN.png")}
            style={styles.heroImage}
            resizeMode="cover"
          />

        </View>

        {/* =================================================
            ABOUT
        ================================================= */}
        <View style={styles.aboutSection}>

          <Text style={styles.aboutTitle}>
            {language === "en" ? "TRAN HAU" : "TRẦN HẬU"}
          </Text>

          <Text style={styles.aboutDescription}>
            Xuất phát từ một nhạc công chuyên nghiệp,
            tôi đến với âm thanh từ những năm tháng đứng
            trên sân khấu. Trải nghiệm biểu diễn giúp tôi
            hiểu rằng âm thanh không chỉ cần rõ và đẹp,
            mà còn phải giữ được tinh thần của người nghệ
            sĩ và cảm xúc của màn trình diễn. Vì vậy, tôi
            luôn bắt đầu bằng sự lắng nghe — lắng nghe
            nghệ sĩ, không gian và âm nhạc — để âm thanh
            hòa vào sân khấu một cách tự nhiên.
          </Text>

        </View>

        {/* =================================================
            SERVICES
        ================================================= */}
        <View style={styles.choose}>

          {/* AUDIO ENGINEER */}
          <ServiceCard
            icon="options-outline"
            title="AUDIO DIRECTOR / AUDIO ENGINEER"
            onPress={() =>
              router.push("/audio-engineer")
            }
          />

          {/* MUSIC PRODUCER */}
          <ServiceCard
            icon="disc-outline"
            title="MUSIC PRODUCER"
            onPress={() =>
              router.push("/music-producer")
            }
          />

          {/* PERFORMANCE */}
          <ServiceCard
            icon="mic-outline"
            title="PERFORMANCE & MUSICAL BACKGROUND"
            onPress={() =>
              router.push("/performance")
            }
          />

          {/* WORKSHOP */}
          <ServiceCard
            icon="school-outline"
            title="WORKSHOPS & MASTERCLASSES"
            onPress={() =>
              router.push("/workshops")
            }
          />

        </View>

        {/* =================================================
            FOOTER
        ================================================= */}
        <View style={styles.footer}>

          {/* ACTION BUTTONS */}
          <View style={styles.actionButtons}>

            <Pressable
              style={[
                styles.actionButton,
                styles.emailButton,
              ]}
              onPress={() =>
                Linking.openURL(
                  "mailto:tranhauaudio@gmail.com"
                )
              }
            >
              <Ionicons
                name="mail"
                size={16}
                color="#fff"
              />

              <Text style={styles.actionText}>
                Email
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.actionButton,
                styles.callButton,
              ]}
              onPress={() =>
                Linking.openURL(
                  "tel:0984123494"
                )
              }
            >
              <Ionicons
                name="call"
                size={16}
                color="#fff"
              />

              <Text style={styles.actionText}>
                Call
              </Text>
            </Pressable>

          </View>

          {/* =================================================
              NAVIGATION ACCORDION
          ================================================= */}
          <Accordion
            title="NAVIGATION"
            open={openSection === "navigation"}
            onPress={() =>
              toggleSection("navigation")
            }
          >
            <FooterLink
              title="Overview"
              onPress={() => router.push("/")}
            />

            <FooterLink
              title="Audio Director / Audio Engineer"
              onPress={() =>
                router.push("/audio-engineer")
              }
            />

            <FooterLink
              title="Music Producer"
              onPress={() =>
                router.push("/music-producer")
              }
            />

            <FooterLink
              title="Performance"
              onPress={() =>
                router.push("/performance")
              }
            />

            <FooterLink
              title="Workshops & Masterclasses"
              onPress={() =>
                router.push("/workshops")
              }
            />
          </Accordion>

          {/* =================================================
              CONTACT ACCORDION
          ================================================= */}
          <Accordion
            title="CONTACT"
            open={openSection === "contact"}
            onPress={() =>
              toggleSection("contact")
            }
          >
            <Text style={styles.contactText}>
              Email: tranhauaudio@gmail.com
            </Text>

            <Text style={styles.contactText}>
              Phone: 0984 123 494
            </Text>

            <Text style={styles.contactText}>
              Location: Ho Chi Minh City
            </Text>
          </Accordion>

          {/* =================================================
              FACEBOOK
          ================================================= */}
          <Pressable
            style={styles.socialRow}
            onPress={() =>
              Linking.openURL(
                "https://www.facebook.com/tran.haudrum/"
              )
            }
          >
            <Ionicons
              name="logo-facebook"
              size={18}
              color="#fff"
            />

            <Text style={styles.facebookText}>
              Facebook
            </Text>
          </Pressable>

          {/* =================================================
              COPYRIGHT
          ================================================= */}
          <View style={styles.footerBottom}>

            <Text style={styles.copyright}>
              © 2025 Trung Kien & Truc Vy.
              All rights reserved.
            </Text>

            <Text style={styles.copyright}>
              Designed for Sound. Built for Impact.
            </Text>

          </View>

        </View>

      </ScrollView>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}
      <BottomNavigation />

    </View>
  );
}


/* ============================================================
   SERVICE CARD
============================================================ */

type ServiceCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
};

function ServiceCard({
  icon,
  title,
  onPress,
}: ServiceCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.chooseCard,
        pressed && styles.chooseCardPressed,
      ]}
      onPress={onPress}
    >

      <View style={styles.cardIcon}>
        <Ionicons
          name={icon}
          size={22}
          color="#888"
        />
      </View>

      <Text style={styles.cardTitle}>
        {title}
      </Text>

      <Text style={styles.cardArrow}>
        ›
      </Text>

    </Pressable>
  );
}


/* ============================================================
   FOOTER ACCORDION
============================================================ */

type AccordionProps = {
  title: string;
  open: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

function Accordion({
  title,
  open,
  onPress,
  children,
}: AccordionProps) {
  return (
    <View style={styles.accordionItem}>

      <Pressable
        style={styles.accordionHeader}
        onPress={onPress}
      >
        <Text style={styles.accordionTitle}>
          {title}
        </Text>

        <Text style={styles.accordionIcon}>
          {open ? "−" : "+"}
        </Text>
      </Pressable>

      {open && (
        <View style={styles.accordionContent}>
          {children}
        </View>
      )}

    </View>
  );
}


/* ============================================================
   FOOTER LINK
============================================================ */

type FooterLinkProps = {
  title: string;
  onPress: () => void;
};

function FooterLink({
  title,
  onPress,
}: FooterLinkProps) {
  return (
    <Pressable
      style={styles.footerLink}
      onPress={onPress}
    >
      <Text style={styles.footerLinkText}>
        {title}
      </Text>
    </Pressable>
  );
}


/* ============================================================
   BOTTOM NAVIGATION
============================================================ */

function BottomNavigation() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.bottomNav,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >

      <BottomTab
        icon="home"
        label="Overview"
        active
        onPress={() => router.push("/")}
      />

      <BottomTab
        icon="options"
        label="Engineer"
        onPress={() =>
          router.push("/audio-engineer")
        }
      />

      <BottomTab
        icon="disc"
        label="Producer"
        onPress={() =>
          router.push("/music-producer")
        }
      />

      <BottomTab
        icon="mic"
        label="Performance"
        onPress={() =>
          router.push("/performance")
        }
      />

      <BottomTab
        icon="school"
        label="Workshop"
        onPress={() =>
          router.push("/workshops")
        }
      />

    </View>
  );
}


type BottomTabProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active?: boolean;
  onPress: () => void;
};

function BottomTab({
  icon,
  label,
  active,
  onPress,
}: BottomTabProps) {
  return (
    <Pressable
      style={styles.bottomTab}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={19}
        color={
          active
            ? COLORS.orange
            : "#777"
        }
      />

      <Text
        style={[
          styles.bottomLabel,
          active && styles.bottomLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}


/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({

  /* ========================================================
     CONTAINER
  ======================================================== */

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 20,
  },

  /* ========================================================
     HEADER
  ======================================================== */

 header: {
  minHeight: 58,

  paddingHorizontal: 20,
  paddingBottom: 10,

  backgroundColor: COLORS.header,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  borderBottomWidth: 1,
  borderBottomColor: "#222",

  zIndex: 100,
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

    fontSize: 20,

    fontWeight: "800",

    letterSpacing: 1,
  },

  languageContainer: {
    flexDirection: "row",

    gap: 4,
  },

  languageButton: {
    backgroundColor: "#222",

    borderWidth: 1,
    borderColor: "#444",

    paddingHorizontal: 8,
    paddingVertical: 6,

    borderRadius: 4,
  },

  languageActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },

  languageText: {
    color: COLORS.white,

    fontSize: 11,

    fontWeight: "700",
  },

  /* ========================================================
     HERO
  ======================================================== */

  heroMenu: {
    padding: 20,

    backgroundColor: COLORS.background,
  },

  heroImage: {
    width: "100%",

    height: 250,

    borderRadius: 8,
  },

  /* ========================================================
     ABOUT
  ======================================================== */

  aboutSection: {
    paddingHorizontal: 20,

    paddingTop: 8,

    paddingBottom: 15,

    alignItems: "center",
  },

  aboutTitle: {
    color: COLORS.white,

    fontSize: 34,

    fontWeight: "900",

    letterSpacing: 3,

    marginBottom: 15,

    textAlign: "center",
  },

  quote: {
    color: "#e8bb76",

    fontSize: 18,

    fontWeight: "700",

    fontStyle: "italic",

    lineHeight: 29,

    textAlign: "center",

    marginBottom: 25,
  },

  aboutDescription: {
    color: "#ddd",

    fontSize: 11.5,

    lineHeight: 19,

    textAlign: "center",
  },

  /* ========================================================
     CHOOSE CARDS
  ======================================================== */

  choose: {
    paddingHorizontal: 20,

    paddingTop: 10,

    gap: 12,
  },

  chooseCard: {
    minHeight: 88,

    backgroundColor: COLORS.card,

    borderWidth: 1,

    borderColor: COLORS.border,

    borderRadius: 8,

    padding: 16,

    position: "relative",

    justifyContent: "center",
  },

  chooseCardPressed: {
    backgroundColor: "#1b1b1b",
  },

  cardIcon: {
    marginBottom: 8,
  },

  cardTitle: {
    color: COLORS.white,

    fontSize: 15,

    fontWeight: "800",

    letterSpacing: 0.5,

    paddingRight: 35,
  },

  cardArrow: {
    position: "absolute",

    right: 16,

    top: 28,

    color: COLORS.orange,

    fontSize: 26,

    fontWeight: "700",
  },

  /* ========================================================
     FOOTER
  ======================================================== */

  footer: {
    marginTop: 35,

    paddingHorizontal: 20,

    paddingTop: 30,

    backgroundColor: COLORS.background,
  },

  /* ========================================================
     ACTION BUTTONS
  ======================================================== */

  actionButtons: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 25,
  },

  actionButton: {
    flex: 1,

    height: 44,

    borderRadius: 6,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 8,

    borderWidth: 1,
  },

  emailButton: {
    backgroundColor: COLORS.orange,

    borderColor: COLORS.orange,
  },

  callButton: {
    backgroundColor: "#161616",

    borderColor: "#333",
  },

  actionText: {
    color: COLORS.white,

    fontSize: 13,

    fontWeight: "700",
  },

  /* ========================================================
     ACCORDION
  ======================================================== */

  accordionItem: {
    borderTopWidth: 1,

    borderTopColor: "#252525",
  },

  accordionHeader: {
    height: 50,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  accordionTitle: {
    color: COLORS.white,

    fontSize: 15,

    fontWeight: "500",

    letterSpacing: 0.5,
  },

  accordionIcon: {
    color: COLORS.gray,

    fontSize: 22,
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

  contactText: {
    color: "#aaa",

    fontSize: 12,

    marginBottom: 8,
  },

  /* ========================================================
     SOCIAL
  ======================================================== */

  socialRow: {
    height: 50,

    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    borderTopWidth: 1,

    borderBottomWidth: 1,

    borderColor: "#252525",
  },

  facebookText: {
    color: COLORS.white,

    fontSize: 13,
  },

  /* ========================================================
     COPYRIGHT
  ======================================================== */

  footerBottom: {
    alignItems: "center",

    paddingVertical: 20,
  },

  copyright: {
    color: "#666",

    fontSize: 10,

    lineHeight: 17,

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

  minHeight: 60,

  backgroundColor: "#111",

  borderTopWidth: 1,
  borderTopColor: "#222",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",

  paddingTop: 6,

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

  bottomLabel: {
    color: "#777",

    fontSize: 9,
    textAlign: "center",
  },

  bottomLabelActive: {
    color: COLORS.orange,
  },
});