import React, { useEffect, useRef, useState } from "react";

import {

  Animated,

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

import { COLORS } from "../theme/theme";
import { LocalizedText as Text, useLanguage } from "../i18n/language";

/* ============================================================

   PRODUCTIONS

============================================================ */

const productions = [

  {

    title: 'Đen Vâu — "Trốn Tìm"',

    image: require("../../assets/trontim.png"),

    url: "https://youtu.be/Ws-QlpSltr8?list=RDWs-QlpSltr8",

  },

  {

    title: '"Ai muốn nghe không"',

    image: require("../../assets/aimuon.png"),

    url: "https://youtu.be/JxBnLmCOEJ8?list=RDJxBnLmCOEJ8",

  },

  {

    title: '"Diễn viên tồi"',

    image: require("../../assets/denvau.jpg"),

    url: "https://youtu.be/7ICKkagL3xA?list=RD7ICKkagL3xA",

  },

  {

    title: '"DIỆU ÂM CA - GURUJI SAGARRUMAGARMATHA"',

    image: require("../../assets/manhhung.png"),

    url: "https://youtu.be/s32nh04WApE?si=7SrNHy-nLhuyb4kG",

  },

  {

    title: '"CÒN GÌ ĐẸP HƠN"',

    image: require("../../assets/congidep.png"),

    url: "https://youtu.be/-h_xB2-MgfQ?si=9o2S2pGN0ul-nIvq",

  },

  {

    title: '"CON CÒ (THE STORK)"',

    image: require("../../assets/conco.png"),

    url: "https://youtu.be/Nb3mAwLelWI?si=8QQhP4ryB9OUGlF3",

  },

  {

    title: '"The Infinite Ocean / Guitar Sang"',

    image: require("../../assets/chanh.png"),

    url: "https://youtu.be/x6NghAF-kms?si=WP9oEwm8ms20MId8",

  },

];

/* ============================================================

   MAIN SCREEN

============================================================ */

export default function MusicProducerScreen() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const { language, setLanguage } = useLanguage();

  const insets = useSafeAreaInsets();

  /* ============================================================
     5 VÒNG SÓNG ÂM THANH
     Mỗi vòng: xuất hiện -> lan ra -> mờ dần -> biến mất
  ============================================================ */

  const ringAnimations = useRef(
    Array.from({ length: 5 }, () => ({
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.45),
    }))
  ).current;

  useEffect(() => {
    const animations = ringAnimations.map((ring, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 520),

          Animated.parallel([
            Animated.timing(ring.opacity, {
              toValue: 0.9,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(ring.scale, {
              toValue: 1,
              duration: 850,
              useNativeDriver: true,
            }),
          ]),

          Animated.parallel([
            Animated.timing(ring.opacity, {
              toValue: 0,
              duration: 650,
              useNativeDriver: true,
            }),
            Animated.timing(ring.scale, {
              toValue: 1.28,
              duration: 650,
              useNativeDriver: true,
            }),
          ]),

          Animated.delay(300),
        ])
      )
    );

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, []);

  const toggleSection = (section: string) => {

    setOpenSection(

      openSection === section ? null : section

    );

  };

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

          MAIN CONTENT

      ===================================================== */}

      <ScrollView

        style={styles.scroll}

        contentContainerStyle={[

          styles.scrollContent,

          {

            paddingBottom: 80 + insets.bottom,

          },

        ]}

        showsVerticalScrollIndicator={false}

      >

        {/* =================================================

            HERO

        ================================================= */}

<View style={styles.producerHero}>
          {/* 5 VÒNG SÓNG ÂM THANH */}
          <View
            pointerEvents="none"
            style={styles.soundRings}
          >
            {ringAnimations.map((ring, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.soundRing,
                  index === 0 && styles.soundRing1,
                  index === 1 && styles.soundRing2,
                  index === 2 && styles.soundRing3,
                  index === 3 && styles.soundRing4,
                  index === 4 && styles.soundRing5,
                  {
                    opacity: ring.opacity,
                    transform: [{ scale: ring.scale }],
                  },
                ]}
              />
            ))}
          </View>

          {/* CHỮ NẰM TRÊN CÁC VÒNG */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              MUSIC PRODUCER
            </Text>
          </View>
        </View>

        {/* =================================================

            FEATURED COLLABORATIONS

        ================================================= */}

        <View style={styles.productions}>

          <Text style={styles.sectionTitle}>

            FEATURED COLLABORATIONS

          </Text>

          <View style={styles.productionGrid}>

            {productions.map((item, index) => (

              <ProductionCard

                key={index}

                title={item.title}

                image={item.image}

                url={item.url}

              />

            ))}

          </View>

        </View>

        {/* =================================================

            FOOTER

        ================================================= */}

        <View style={styles.footer}>

          {/* EMAIL / CALL */}

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

          {/* NAVIGATION */}

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

          {/* CONTACT */}

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

          {/* FACEBOOK */}

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

          {/* COPYRIGHT */}

          <View style={styles.footerBottom}>

            <Text style={styles.copyright}>

              © 2025 Trung Kien & Truc Vy.

              {"\n"}

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

   PRODUCTION CARD

============================================================ */

type ProductionCardProps = {

  title: string;

  image: any;

  url: string;

};

function ProductionCard({

  title,

  image,

  url,

}: ProductionCardProps) {

  const openYoutube = async () => {

    try {

      await Linking.openURL(url);

    } catch (error) {

      console.log(

        "Cannot open YouTube:",

        error

      );

    }

  };

  return (

    <View style={styles.productionItem}>

      <Image

        source={image}

        style={styles.productionImage}

        resizeMode="cover"

      />

      {/* DARK OVERLAY */}

      <View style={styles.productionOverlay}>

        <Text

          style={styles.productionTitle}

          numberOfLines={3}

        >

          {title}

        </Text>

        <Pressable

          style={({ pressed }) => [

            styles.trackButton,

            pressed &&

              styles.trackButtonPressed,

          ]}

          onPress={openYoutube}

        >

          <Ionicons

            name="play"

            size={13}

            color="#fff"

          />

          <Text style={styles.trackButtonText}>

            Nghe bài hát

          </Text>

        </Pressable>

      </View>

    </View>

  );

}

/* ============================================================

   ACCORDION

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

          height: 60 + insets.bottom,

          paddingBottom: insets.bottom,

        },

      ]}

    >

      <BottomTab

        icon="home"

        label="Overview"

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

        active

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

/* ============================================================

   BOTTOM TAB

============================================================ */

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

            ? COLORS.primary

            : "#777"

        }

      />

      <Text

        style={[

          styles.bottomLabel,

          active &&

            styles.bottomLabelActive,

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

    paddingHorizontal: 20,

    backgroundColor: COLORS.surface,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    borderBottomWidth: 1,

    borderBottomColor: COLORS.border,

    zIndex: 100,

    elevation: 5,

  },

  logoContainer: {

    flexDirection: "row",

    alignItems: "center",

  },

  logoImage: {

    width: 28,

    height: 28,

    borderRadius: 4,

    marginRight: 10,

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

    backgroundColor: COLORS.primary,

    borderColor: COLORS.primary,

  },

  languageText: {

    color: COLORS.white,

    fontSize: 11,

    fontWeight: "700",

  },

  /* ========================================================

     HERO

  ======================================================== */

  producerHero: {
    height: 245,

    backgroundColor: "#080404",

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,

    alignItems: "center",
    justifyContent: "center",

    overflow: "hidden",
    position: "relative",
  },

  /*
   * Container giữ 5 vòng ở đúng tâm Hero.
   */
  soundRings: {
    position: "absolute",

    width: 520,
    height: 520,

    left: "50%",
    top: "50%",

    marginLeft: -260,
    marginTop: -260,

    alignItems: "center",
    justifyContent: "center",
  },

  soundRing: {
    position: "absolute",

    borderRadius: 999,

    borderWidth: 2,

    backgroundColor: "transparent",
  },

  soundRing1: {
    width: 150,
    height: 150,

    borderColor: "rgba(190, 58, 27, 0.72)",
  },

  soundRing2: {
    width: 215,
    height: 215,

    borderColor: "rgba(190, 58, 27, 0.60)",
  },

  soundRing3: {
    width: 280,
    height: 280,

    borderColor: "rgba(190, 58, 27, 0.48)",
  },

  soundRing4: {
    width: 350,
    height: 350,

    borderColor: "rgba(190, 58, 27, 0.36)",
  },

  soundRing5: {
    width: 430,
    height: 430,

    borderColor: "rgba(190, 58, 27, 0.28)",
  },

  heroContent: {
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 18,

    zIndex: 10,
  },

  heroTitle: {
    color: COLORS.white,

    fontSize: 26,
    fontWeight: "900",

    letterSpacing: 0.6,

    textAlign: "center",
    lineHeight: 32,

    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 6,
  },

  productions: {

    paddingHorizontal: 20,

    paddingTop: 25,

    paddingBottom: 10,

  },

  sectionTitle: {

    color: COLORS.white,

    fontSize: 16,

    fontWeight: "800",

    letterSpacing: 1,

    marginBottom: 15,

  },

  productionGrid: {

    gap: 15,

  },

  productionItem: {

    height: 220,

    borderRadius: 8,

    overflow: "hidden",

    backgroundColor: COLORS.surface2,

    borderWidth: 1,

    borderColor: COLORS.border,

    position: "relative",

  },

  productionImage: {

    position: "absolute",

    width: "100%",

    height: "100%",

    left: 0,

    top: 0,

  },

  productionOverlay: {

    position: "absolute",

    left: 0,

    right: 0,

    bottom: 0,

    minHeight: 125,

    padding: 16,

    justifyContent: "flex-end",

    backgroundColor: "rgba(0,0,0,0.72)",

  },

  productionTitle: {

    color: COLORS.white,

    fontSize: 15,

    fontWeight: "800",

    lineHeight: 21,

    marginBottom: 4,

  },

  productionCategory: {

    color: COLORS.primary,

    fontSize: 11,

    fontWeight: "700",

    marginBottom: 10,

  },

  trackButton: {

    alignSelf: "flex-start",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 6,

    backgroundColor: COLORS.primary,

    paddingHorizontal: 14,

    paddingVertical: 8,

    borderRadius: 4,

  },

  trackButtonPressed: {

    opacity: 0.75,

  },

  trackButtonText: {

    color: COLORS.white,

    fontSize: 12,

    fontWeight: "700",

  },

  /* ========================================================

     FOOTER

  ======================================================== */

  footer: {

    marginTop: 20,

    paddingHorizontal: 20,

    paddingTop: 30,

    paddingBottom: 20,

    backgroundColor: "#0f0f0f",

    borderTopWidth: 1,

    borderTopColor: COLORS.border,

  },

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

    backgroundColor: COLORS.primary,

    borderColor: COLORS.primary,

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

    borderTopColor: COLORS.border,

  },

  accordionHeader: {

    minHeight: 52,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

  },

  accordionTitle: {

    color: COLORS.white,

    fontSize: 16,

    fontWeight: "800",

    letterSpacing: 1,

  },

  accordionIcon: {

    color: COLORS.primary,

    fontSize: 20,

  },

  accordionContent: {

    paddingBottom: 12,

  },

  footerLink: {

    paddingVertical: 8,

  },

  footerLinkText: {

    color: "#aaa",

    fontSize: 12,

  },

  contactText: {

    color: "#aaa",

    fontSize: 12,

    marginBottom: 7,

  },

  /* ========================================================

     SOCIAL

  ======================================================== */

  socialRow: {

    height: 48,

    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    borderTopWidth: 1,

    borderBottomWidth: 1,

    borderColor: COLORS.border,

  },

  facebookText: {

    color: COLORS.white,

    fontSize: 12,

  },

  /* ========================================================

     COPYRIGHT

  ======================================================== */

  footerBottom: {

    paddingVertical: 20,

    alignItems: "center",

  },

  copyright: {

    color: "#666",

    fontSize: 10,

    lineHeight: 16,

    textAlign: "center",

  },

  /* ========================================================

     BOTTOM NAVIGATION

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

  bottomLabel: {

    color: "#777",

    fontSize: 9,
    textAlign: "center",
  },

  bottomLabelActive: {

    color: COLORS.primary,

  },

});