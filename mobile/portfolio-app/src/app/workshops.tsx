import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Modal,
  Linking,
  useWindowDimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../theme/theme";
import { LocalizedText as Text, useLanguage } from "../i18n/language";

/* =========================================================
   WORKSHOP DATA
========================================================= */

const workshops = [
  {
    id: "1",
    title: "SỰ KIỆN NHÃN HÀNG",
    
    image: require("../../assets/cuoi/1.jpg"),
  },
  {
    id: "2",
    title: "PRODUCTION WORKSHOP",
    
    image: require("../../assets/cuoi/2.jpg"),
  },
  {
    id: "3",
    title: "LIVE PERFORMANCE",
    
    image: require("../../assets/cuoi/3.jpg"),
  },
  {
    id: "4",
    title: "MUSIC PRODUCTION",
    
    image: require("../../assets/cuoi/4.jpg"),
  },
];

/* =========================================================
   MAIN SCREEN
========================================================= */

export default function Workshops() {
  const { width, height } = useWindowDimensions();
  const { language, setLanguage } = useLanguage();

  const insets = useSafeAreaInsets();

  const [openFooter, setOpenFooter] = useState<string | null>(null);

  const [selectedWorkshop, setSelectedWorkshop] = useState<
    (typeof workshops)[number] | null
  >(null);

  /* =======================================================
     CONTACT ACTIONS
  ======================================================= */

  const openEmail = () => {
    Linking.openURL("mailto:tranhauaudio@gmail.com");
  };

  const openPhone = () => {
    Linking.openURL("tel:0984123494");
  };

  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/tran.haudrum/");
  };

  const openLocation = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=Ho+Chi+Minh+City",
    );
  };

  /* =======================================================
     FOOTER TOGGLE
  ======================================================= */

  const toggleFooter = (section: string) => {
    setOpenFooter(openFooter === section ? null : section);
  };

  /* =======================================================
     MODAL IMAGE SIZE
  ======================================================= */

  const modalImageWidth = width - 40;

  const modalImageHeight = height - insets.top - insets.bottom - 190;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top,
          },
        ]}
      >
        {/* LOGO */}

        <Pressable style={styles.logoArea} onPress={() => router.replace("/")}>
          <Image
            source={require("../../assets/lo.jpg")}
            style={styles.logoImage}
          />

          <Text style={styles.logoText}>HAU TRAN</Text>
        </Pressable>

        {/* LANGUAGE */}

        <View style={styles.languageArea}>
          <Pressable
            style={[
              styles.languageButton,
              language === "en" && styles.languageActive,
            ]}
            onPress={() => setLanguage("en")}
          >
            <Text
              style={
                language === "en"
                  ? styles.languageActiveText
                  : styles.languageText
              }
            >
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
            <Text
              style={
                language === "vi"
                  ? styles.languageActiveText
                  : styles.languageText
              }
            >
              VI
            </Text>
          </Pressable>
        </View>
      </View>

      {/* =================================================
          MAIN SCROLL
      ================================================= */}

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 90 + insets.bottom,
          },
        ]}
      >
        {/* =================================================
            PAGE TITLE
        ================================================= */}

        <View style={styles.titleBlock}>
  <LinearGradient
    colors={[
      "#050505",
      "#1A0905",
      "#351208",
      "#1A0905",
      "#050505",
    ]}
    locations={[0, 0.22, 0.5, 0.78, 1]}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
    style={styles.heroGradient}
  />

  <Text style={styles.pageTitle}>
    WORKSHOPS & MASTERCLASSES.
  </Text>
</View>

        {/* =================================================
            WORKSHOP GALLERY
        ================================================= */}

        <View style={styles.gallery}>
          {workshops.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              onPress={() => setSelectedWorkshop(item)}
            >
              {/* IMAGE */}

              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="cover"
              />

              {/* DARK OVERLAY */}

              <View style={styles.cardGradient} />

              {/* CARD CONTENT */}

              <View style={styles.cardContent}>
                <View style={styles.cardTextArea}>
                 

                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>

                {/* ARROW */}

                <View style={styles.cardArrow}>
                  <Ionicons
                    name="arrow-up-outline"
                    size={18}
                    color="#fff"
                    style={{
                      transform: [
                        {
                          rotate: "45deg",
                        },
                      ],
                    }}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View style={styles.footer}>
          {/* =================================================
              EMAIL / CALL
          ================================================= */}

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.emailButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={openEmail}
            >
              <Ionicons name="mail" size={16} color="#fff" />

              <Text style={styles.actionText}>Email</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.callButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={openPhone}
            >
              <Ionicons name="call" size={16} color="#fff" />

              <Text style={styles.actionText}>Call</Text>
            </Pressable>
          </View>

          {/* =================================================
              NAVIGATION
          ================================================= */}

          <FooterAccordion
            title="NAVIGATION"
            open={openFooter === "nav"}
            onPress={() => toggleFooter("nav")}
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

          {/* =================================================
              CONTACT
          ================================================= */}

          <FooterAccordion
            title="CONTACT"
            open={openFooter === "contact"}
            onPress={() => toggleFooter("contact")}
          >
            <Pressable onPress={openEmail}>
              <Text style={styles.contactText}>
                Email: tranhauaudio@gmail.com
              </Text>
            </Pressable>

            <Pressable onPress={openPhone}>
              <Text style={styles.contactText}>Phone: 0984 123 494</Text>
            </Pressable>

            <Pressable onPress={openLocation}>
              <Text style={styles.contactText}>Location: Ho Chi Minh City</Text>
            </Pressable>
          </FooterAccordion>

          {/* =================================================
              FACEBOOK
          ================================================= */}

          <Pressable style={styles.facebook} onPress={openFacebook}>
            <Ionicons name="logo-facebook" size={18} color="#fff" />

            <Text style={styles.facebookText}>Facebook</Text>
          </Pressable>

          {/* =================================================
              COPYRIGHT
          ================================================= */}

          <View style={styles.footerBottom}>
            <Text style={styles.copyrightText}>
              © 2025 Trung Kien & Truc Vy.
              {"\n"}
              All rights reserved.
            </Text>

            <Text style={styles.copyrightText}>
              Designed for Sound. Built for Impact.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <BottomNav active="Workshop" />

      {/* =================================================
          FULL IMAGE MODAL
      ================================================= */}

      <Modal
        visible={selectedWorkshop !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedWorkshop(null)}
      >
        <View style={styles.modalBackground}>
          {/* CLOSE BUTTON */}

          <Pressable
            style={[
              styles.modalClose,
              {
                top: insets.top + 15,
              },
            ]}
            onPress={() => setSelectedWorkshop(null)}
          >
            <Ionicons name="close" size={25} color="#fff" />
          </Pressable>

          {/* IMAGE */}

          {selectedWorkshop && (
            <View style={styles.modalContent}>
              <Image
                source={selectedWorkshop.image}
                style={{
                  width: modalImageWidth,
                  height: modalImageHeight,
                }}
                resizeMode="contain"
              />

              {/* TITLE */}

              <Text style={styles.modalTitle}>{selectedWorkshop.title}</Text>

              {/* CATEGORY */}

              <Text style={styles.modalCategory}>
               
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

/* =========================================================
   FOOTER ACCORDION
========================================================= */

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

/* =========================================================
   FOOTER LINK
========================================================= */

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

/* =========================================================
   BOTTOM NAVIGATION
========================================================= */

function BottomNav({ active }: { active: string }) {
  const insets = useSafeAreaInsets();

  const tabs = [
    {
      label: "Overview",
      icon: "home-outline" as const,
      route: "/",
    },
    {
      label: "Engineer",
      icon: "options-outline" as const,
      route: "/audio-engineer",
    },
    {
      label: "Producer",
      icon: "disc-outline" as const,
      route: "/music-producer",
    },
    {
      label: "Performance",
      icon: "mic-outline" as const,
      route: "/performance",
    },
    {
      label: "Workshop",
      icon: "school-outline" as const,
      route: "/workshops",
    },
  ];

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
      {tabs.map((tab) => {
        const isActive = active === tab.label;

        return (
          <Pressable
            key={tab.label}
            style={[styles.bottomItem, isActive && styles.bottomActiveItem]}
            onPress={() => {
              if (tab.route === "/") {
                router.push("/");
              } else if (tab.route === "/audio-engineer") {
                router.push("/audio-engineer");
              } else if (tab.route === "/music-producer") {
                router.push("/music-producer");
              } else if (tab.route === "/performance") {
                router.push("/performance");
              } else if (tab.route === "/workshops") {
                router.push("/workshops");
              }
            }}
          >
            <Ionicons
              name={tab.icon}
              size={21}
              color={isActive ? COLORS.primary : "#777"}
            />

            <Text
              style={[styles.bottomText, isActive && styles.bottomActiveText]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  /* =======================================================
     CONTAINER
  ======================================================= */

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* =======================================================
     HEADER
  ======================================================= */

  header: {
    minHeight: 64,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: COLORS.surface,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

    zIndex: 100,
    elevation: 5,
  },

  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  logoImage: {
    width: 26,
    height: 26,

    borderRadius: 4,

    marginRight: 8,
  },

  logoCircle: {
    width: 34,
    height: 34,

    borderRadius: 17,

    backgroundColor: COLORS.primary,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 9,
  },

  logoSymbol: {
    color: COLORS.white,

    fontSize: 18,
    fontWeight: "900",
  },

  logoText: {
    color: COLORS.white,

    fontSize: 18,
    fontWeight: "900",

    letterSpacing: 0.8,
  },

  languageArea: {
    flexDirection: "row",
    gap: 5,
  },

  languageButton: {
    minWidth: 35,
    height: 34,

    paddingHorizontal: 9,

    borderRadius: 6,

    borderWidth: 1,
    borderColor: "#444",

    alignItems: "center",
    justifyContent: "center",
  },

  languageActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  languageText: {
    color: COLORS.white,

    fontSize: 11,
    fontWeight: "800",
  },

  languageActiveText: {
    color: COLORS.white,

    fontSize: 11,
    fontWeight: "900",
  },

  /* =======================================================
     SCROLL
  ======================================================= */

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 90,
  },

  /* =======================================================
     TITLE
  ======================================================= */

titleBlock: {
  width: "100%",
  height: 245,

  position: "relative",

  alignItems: "center",
  justifyContent: "center",

  overflow: "hidden",

  borderBottomWidth: 1,
  borderBottomColor: "#242424",
},

heroGradient: {
  position: "absolute",

  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},

pageTitle: {
  width: "100%",

  paddingHorizontal: 16,

  color: "#ffffff",

  fontSize: 26,
  fontWeight: "900",

  letterSpacing: 0.5,
  lineHeight: 32,

  textAlign: "center",

  includeFontPadding: false,

  zIndex: 2,

  textShadowColor: "rgba(0, 0, 0, 0.9)",
  textShadowOffset: {
    width: 0,
    height: 2,
  },
  textShadowRadius: 6,
},

  pageTitleSecond: {
    color: COLORS.white,

    fontSize: 26,
    fontWeight: "900",

    letterSpacing: 0.5,
    lineHeight: 32,
  },

  orangeLine: {
    width: 55,
    height: 3,

    backgroundColor: COLORS.primary,

    marginTop: 16,
    marginBottom: 17,
  },

  description: {
    color: "#999",

    fontSize: 13,
    lineHeight: 21,
  },

  /* =======================================================
     GALLERY
  ======================================================= */

  gallery: {
    paddingHorizontal: 20,
    gap: 14,
    paddingTop: 24,
  },

  card: {
    width: "100%",
    aspectRatio: 16 / 10,

    borderRadius: 7,
    overflow: "hidden",

    backgroundColor: COLORS.surface2,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  cardPressed: {
    opacity: 0.75,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  cardGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "28%",
    backgroundColor: "rgba(0,0,0,0.58)",
    
  },

  cardContent: {
    position: "absolute",

    left: 0,
    right: 0,
    bottom: 0,

    padding: 17,

    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  cardTextArea: {
    flex: 1,

    paddingRight: 10,
  },

  category: {
    color: "rgba(255,255,255,0.72)",

    fontSize: 9,
    fontWeight: "800",

    letterSpacing: 2,

    marginBottom: 5,
  },

  cardTitle: {
    color: COLORS.white,

    fontSize: 19,
    fontWeight: "900",

    lineHeight: 23,
  },

  cardArrow: {
    width: 35,
    height: 35,

    borderRadius: 18,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",

    alignItems: "center",
    justifyContent: "center",
  },

  /* =======================================================
     FOOTER
  ======================================================= */

  footer: {
    marginTop: 35,

    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,

    backgroundColor: COLORS.background,
  },

  /* =======================================================
     EMAIL / CALL
  ======================================================= */

  actions: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 25,
  },

  emailButton: {
    flex: 1,

    height: 44,

    backgroundColor: COLORS.primary,

    borderWidth: 1,
    borderColor: COLORS.primary,

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

  buttonPressed: {
    opacity: 0.65,
  },

  /* =======================================================
     ACCORDION
  ======================================================= */

  accordion: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
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
    fontWeight: "500",

    letterSpacing: 0.5,
  },

  accordionIcon: {
    color: COLORS.primary,

    fontSize: 22,
  },

  accordionContent: {
    paddingBottom: 12,
  },

  /* =======================================================
     FOOTER LINKS
  ======================================================= */

  footerLink: {
    paddingVertical: 7,
  },

  footerLinkText: {
    color: "#aaa",

    fontSize: 12,
  },

  /* =======================================================
     CONTACT
  ======================================================= */

  contactText: {
    color: "#aaa",

    fontSize: 12,

    marginBottom: 8,
  },

  /* =======================================================
     FACEBOOK
  ======================================================= */

  facebook: {
    height: 50,

    flexDirection: "row",
    alignItems: "center",

    gap: 10,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderColor: COLORS.border,
  },

  facebookText: {
    color: COLORS.white,

    fontSize: 13,
  },

  /* =======================================================
     COPYRIGHT
  ======================================================= */

  footerBottom: {
    paddingVertical: 20,

    alignItems: "center",
  },

  copyrightText: {
    color: "#666",

    fontSize: 10,
    lineHeight: 17,

    textAlign: "center",
  },

  /* =======================================================
     BOTTOM NAV
  ======================================================= */

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

    paddingHorizontal: 3,

    zIndex: 2000,
    elevation: 10,
  },

  bottomItem: {
    flex: 1,

    minHeight: 48,

    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    gap: 4,

    marginHorizontal: 2,
  },

  /*
    IMPORTANT:
    Khi tab đang active, nó sẽ hiện
    thành một nút CAM.
  */

  bottomActiveItem: {
    backgroundColor: "transparent",
  },

  bottomText: {
    color: "#777",

    fontSize: 9,

    textAlign: "center",
  },

  bottomActiveText: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  /* =======================================================
     FULL IMAGE MODAL
  ======================================================= */

  modalBackground: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.96)",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  modalContent: {
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },

  modalTitle: {
    color: COLORS.white,

    fontSize: 20,
    fontWeight: "800",

    textAlign: "center",

    marginTop: 12,
  },

  modalCategory: {
    color: COLORS.primary,

    fontSize: 11,
    fontWeight: "800",

    letterSpacing: 2,

    marginTop: 7,
  },

  modalClose: {
    position: "absolute",

    right: 20,

    zIndex: 10,

    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "rgba(255,255,255,0.12)",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
});
