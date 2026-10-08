import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Linking,
  Modal,
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

const ORANGE = "#ff5722";

const featuredShows = [
  {
    title: "Vesak Liên Hợp Quốc 2025",
    images: [
      require("../../assets/image/1. Vesak Liên Hợp Quốc 2025/2.png"),
      require("../../assets/image/1. Vesak Liên Hợp Quốc 2025/4.jpg"),
      require("../../assets/image/1. Vesak Liên Hợp Quốc 2025/phu07437-17466296340211975867000.jpg"),
      require("../../assets/image/1. Vesak Liên Hợp Quốc 2025/3.png"),
      require("../../assets/image/1. Vesak Liên Hợp Quốc 2025/1.png"),
    ],
  },

   {
    title: "Yêu Hòa Bình 2022-2023-2024",
    images: [
      require("../../assets/image/7/1.png"),
      require("../../assets/image/7/IMG_8430.png"),
      require("../../assets/image/7/IMG_8431.png"),
      require("../../assets/image/7/IMG_8432.png"),
      require("../../assets/image/7/IMG_8433.png"),
      require("../../assets/image/7/IMG_8434.png"),
      require("../../assets/image/7/IMG_8449.png"),
      require("../../assets/image/7/IMG_8461.png"),
    ],
  },

  {
    title: "Grand Opus Piano Competition GOPC 2024",
    images: [
      require("../../assets/image2/GOPC2024/IMG_8359.jpg"),
      require("../../assets/image2/GOPC2024/IMG_8360.jpg"),
      require("../../assets/image2/GOPC2024/IMG_8361.jpg"),
    ],
  },

   {
    title: "In Gratitude - Concert",
    images: [
      require("../../assets/image/12/IMG_2323.png"),
      require("../../assets/image/12/IMG_2328.png"),
      require("../../assets/image/12/IMG_2329.png"),
      require("../../assets/image/12/IMG_9562.png"),
    ],
  },

  {
    title: "Sound Healing Concert 2026",
    images: [
      require("../../assets/image/2/07E82560-D24B-4DC6-A290-BD4B47B7B992.png"),
      require("../../assets/image/2/IMG_2305.png"),
      require("../../assets/image/2/IMG_2307.png"),
      require("../../assets/image/2/IMG_2308.png"),
      require("../../assets/image/2/IMG_2309.png"),
    ],
  },

  {
    title: "HD Bank Lời Cho Tương Lai Concert",
    images: [
      require("../../assets/image/3/IMG_2310.png"),
      require("../../assets/image/3/IMG_2311.png"),
      require("../../assets/image/3/IMG_2312.png"),
      require("../../assets/image/3/IMG_2313.png"),
      require("../../assets/image/3/IMG_2314.png"),
      require("../../assets/image/3/IMG_2315.png"),
    ],
  },

  {
    title: "Disney Concert",
    images: [
      require("../../assets/image/4/IMG_8455.png"),
      require("../../assets/image/4/IMG_8456.png"),
      require("../../assets/image/4/IMG_8457.png"),
    ],
  },

  {
    title: "Hội Thuần Hội 2024",
    images: [
      require("../../assets/image/5/IMG_8498.png"),
      require("../../assets/image/5/IMG_8501.png"),
      require("../../assets/image/5/IMG_8502.png"),
    ],
  },

  {
    title: "Just Rock 2024",
    images: [
      require("../../assets/image/9/IMG_8469.png"),
      require("../../assets/image/9/IMG_8470.png"),
      require("../../assets/image/9/IMG_8471.png"),
      require("../../assets/image/9/IMG_8473.png"),
      require("../../assets/image/9/IMG_8474.png"),
      require("../../assets/image/9/IMG_8475.png"),
    ],
  },

  {
    title: "La Musica Fes",
    images: [
      require("../../assets/image/10/607722145_122112371883141145_6497519304125968365_n.jpg"),
      require("../../assets/image/10/619373791_122116531899141145_1076480621119345369_n.jpg"),
      require("../../assets/image/10/626686998_122117586009141145_5643325806134797381_n.jpg"),
      require("../../assets/image/10/IMG_2331.png"),
      require("../../assets/image/10/IMG_2334.png"),
    ],
  },

  {
    title: "Ghibli Concert",
    images: [
      require("../../assets/image/6/IMG_8482.png"),
      require("../../assets/image/6/IMG_8483.png"),
      require("../../assets/image/6/IMG_8484.png"),
      require("../../assets/image/6/IMG_8485.png"),
    ],
  },

  {
    title: "Acecook Happiness Concert 30 Years Of Acecook VietNam’s",
    images: [
      require("../../assets/image/11/IMG_2339.png"),
      require("../../assets/image/11/IMG_2340.png"),
    ],
  },
];

const otherShows = [
  [
    "Dept Asia Tour - Live in Viet Nam 2024",
    "Live Sound",
    require("../../assets/image2/1/IMG_8369.png"),
    require("../../assets/image2/1/IMG_8370.png"),
    require("../../assets/image2/1/IMG_8371.png"),
    require("../../assets/image2/1/IMG_8372.png"),
    require("../../assets/image2/1/IMG_8373.png"),
    require("../../assets/image2/1/IMG_8374.png"),
  ],
  [
    "Đại nhạc hội Shopee Food",
    "Festival",
    require("../../assets/image2/2/1.png"),
  ],
  [
    "Anika Nilles World Tour in Viet Nam 2024",
    "World Tour",
    require("../../assets/image2/3/IMG_8397.png"),
    require("../../assets/image2/3/IMG_8398.png"),
    require("../../assets/image2/3/IMG_8399.png"),
  ],
  [
    "Grammy Award Winner Sangeeta Kaur",
    "Special Event",
    require("../../assets/image2/4/IMG_8494.png"),
    require("../../assets/image2/4/IMG_8495.png"),
    require("../../assets/image2/4/IMG_8496.png"),
    require("../../assets/image2/4/IMG_8497.png"),
  ],
  [
    "Ichika Nito World Tour in Vietnam 2023",
    "Special Event",
    require("../../assets/image2/5/IMG_8400.png"),
    require("../../assets/image2/5/IMG_8401.png"),
    require("../../assets/image2/5/IMG_8402.png"),
  ],
  [
    "New Hope Club live in Vietnam 2022",
    "Live Show",
    require("../../assets/image2/6/IMG_8411.png"),
    require("../../assets/image2/6/IMG_8412.png"),
    require("../../assets/image2/6/IMG_8413.png"),
    require("../../assets/image2/6/IMG_8414.png"),
    require("../../assets/image2/6/IMG_8415.png"),
    require("../../assets/image2/6/IMG_8416.png"),
    require("../../assets/image2/6/IMG_8417.png"),
  ],
  [
    "+84 Showcase 2024",
    "Live Sound",
    require("../../assets/image2/7/IMG_8366.png"),
    require("../../assets/image2/7/IMG_8367.png"),
    require("../../assets/image2/7/IMG_8368.png"),
  ],
  [
    "The Theatre - Rock Concert",
    "Rock Concert",
    require("../../assets/image2/8/IMG_8389.png"),
    require("../../assets/image2/8/IMG_8390.png"),
    require("../../assets/image2/8/IMG_8391.png"),
    require("../../assets/image2/8/IMG_8392.png"),
    require("../../assets/image2/8/IMG_8393.png"),
    require("../../assets/image2/8/IMG_8394.png"),
  ],
  [
    "A Tale Of Two Christmas",
    "Live Sound",
    require("../../assets/image2/9/IMG_8458.png"),
    require("../../assets/image2/9/IMG_8459.png"),
  ],
  [
    "Biển Của Hy Vọng 2022",
    "Live Sound",
    require("../../assets/image2/10/IMG_8486.png"),
    require("../../assets/image2/10/IMG_8487.png"),
    require("../../assets/image2/10/IMG_8490.png"),
    require("../../assets/image2/10/IMG_8489.png"),
  ],
  [
    "Chopin Concerto No.2",
    "Orchestra",
    require("../../assets/image2/11/IMG_8591.png"),
    require("../../assets/image2/11/IMG_8592.png"),
  ],
  [
    "Christmas Crescendo Concert 2022",
    "Concert",
    require("../../assets/image2/12/IMG_8526.png"),
    require("../../assets/image2/12/IMG_8527.png"),
    require("../../assets/image2/12/IMG_8528.png"),
    require("../../assets/image2/12/IMG_8529.png"),
    require("../../assets/image2/12/IMG_8530.png"),
  ],
  [
    "CROSSROADS THE UNTOLD STORIES",
    "Live Show",
    require("../../assets/image2/13/IMG_8460.png"),
    require("../../assets/image2/13/IMG_8461.png"),
    require("../../assets/image2/13/IMG_8462.png"),
  ],
  [
    "Motul Festival 2024",
    "Festival",
    require("../../assets/image2/2024/IMG_8406.png"),
    require("../../assets/image2/2024/IMG_8407.png"),
    require("../../assets/image2/2024/IMG_8403.png"),
    require("../../assets/image2/2024/IMG_8404.png"),
    require("../../assets/image2/2024/IMG_8405.png"),
  ],
  [
    "DOC MusicShow 2024",
    "Music Show",
    require("../../assets/image2/14/IMG_8570.png"),
    require("../../assets/image2/14/IMG_8571.png"),
  ],
  [
    "Game Show Người Yêu Tôi Đỉnh Nhất 2024",
    "Game Show",
    require("../../assets/image2/15/IMG_8491.png"),
    require("../../assets/image2/15/IMG_8492.png"),
    require("../../assets/image2/15/IMG_8493.png"),
  ],
  [
    "Grand Opus Piano Competition GOPC 2023",
    "Special Event",
    require("../../assets/image2/GOPC2023/IMG_8362.png"),
    require("../../assets/image2/GOPC2023/IMG_8363.png"),
    require("../../assets/image2/GOPC2023/IMG_8364.png"),
    require("../../assets/image2/GOPC2023/IMG_8365.png"),
  ],
  [
    "Hội Báo Toàn Quốc 2024",
    "Special Event",
    require("../../assets/image2/a2024/IMG_8476.png"),
    require("../../assets/image2/a2024/IMG_8478.png"),
    require("../../assets/image2/a2024/IMG_8479.png"),
    require("../../assets/image2/a2024/IMG_8480.png"),
    require("../../assets/image2/a2024/IMG_8481.png"),
  ],
  [
    "Họp Báo Công Bổ Live Concert Uyên Linh 2024",
    "Special Event",
    require("../../assets/image2/16/IMG_8555.png"),
  ],
  [
    "Họp Báo Quốc Thiên Skynote Concert",
    "Special Event",
    require("../../assets/image2/17/IMG_8557.png"),
    require("../../assets/image2/17/IMG_8559.png"),
  ],
  [
    "Họp Báo Ra Mắt MV Hồ Quỳnh Hương",
    "Special Event",
    require("../../assets/image2/18/IMG_8551.png"),
    require("../../assets/image2/18/IMG_8552.png"),
  ],
  [
    "Jack Gardiner – Asia Tour 2026 - Vietnam",
    "Tour",
    require("../../assets/image2/19/IMG_1046.png"),
  ],
  [
    "Lễ Công Bố Khởi Động Liên Hoan Phim Quốc Tế TP.HCM 2024",
    "Special Event",
    require("../../assets/image2/20/IMG_8546.png"),
    require("../../assets/image2/20/IMG_8547.png"),
    require("../../assets/image2/20/IMG_8548.png"),
    require("../../assets/image2/20/IMG_8549.png"),
    require("../../assets/image2/20/IMG_8550.png"),
  ],
  [
    "Live Show Nguyễn Hải Phong Symphony - Orchestra 2022",
    "Special Event",
    require("../../assets/image2/21/IMG_0820.png"),
    require("../../assets/image2/21/IMG_0821.png"),
    require("../../assets/image2/21/IMG_8385.png"),
    require("../../assets/image2/21/IMG_8386.png"),
    require("../../assets/image2/21/IMG_8387.png"),
    require("../../assets/image2/21/IMG_8388.png"),
  ],
  [
    "K-Drama OST Concert 2025",
    "Concert",
    require("../../assets/22/IMG_2395.png"),
    require("../../assets/22/IMG_2396.png"),
  ],
  [
    "Musica land Fes",
    "Fes",
    require("../../assets/23/IMG_2391.png"),
    require("../../assets/23/IMG_2392.png"),
    require("../../assets/23/IMG_2393.png"),
  ],
  [
    "Ocean by Night - Singapore",
    "Fes",
    require("../../assets/24/IMG_2396.png"),
    require("../../assets/24/IMG_2397.png"),
  ],
  [
    "Rise Of The Underdogs - Rotu 2 - 2025",
    "Fes",
    require("../../assets/25/1.jpg"),
    require("../../assets/25/2.jpg"),
    require("../../assets/25/3.jpg"),
    require("../../assets/25/4.jpg"),
    require("../../assets/25/5.jpg"),
    require("../../assets/25/6.jpg"),
  ],
  [
    "Saigon Choir Concert - Hạt dẻ 3",
    "Concert",
    require("../../assets/26/IMG_2398.png"),
    require("../../assets/26/IMG_2399.png"),
    require("../../assets/26/IMG_2400.png"),
    require("../../assets/26/IMG_2401.png"),
  ],
  [
    "Mỹ Tâm & Hoài Sa Band - Hozo Festival 2024 (FOH Engineer)",
    "Concert",
    require("../../assets/anh1/1.jpg"),
  ],
  [
    "A.Train (에이트레인) - Hozo Festival 2024 (FOH Engineer)",
    "Concert",
    require("../../assets/anh2/2.jpg"),
  ],
  ["Recording Project", "Record", require("../../assets/bosung/1.png")],
];

export default function AudioEngineerScreen() {
  const { language, setLanguage } = useLanguage();
  const [featuredExpanded, setFeaturedExpanded] = useState(false);
  const [otherExpanded, setOtherExpanded] = useState(false);

  const [gallery, setGallery] = useState<any[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const [openFooter, setOpenFooter] = useState<string | null>(null);

  const insets = useSafeAreaInsets();

  const waveAnimations = useRef(
    Array.from({ length: 50 }, () => new Animated.Value(1)),
  ).current;

  useEffect(() => {
    const animations = waveAnimations.map((value, index) => {
      const minScale = 0.35 + (index % 4) * 0.08;
      const maxScale = 1.1 + (index % 5) * 0.12;

      return Animated.loop(
        Animated.sequence([
          Animated.delay(index * 45),

          Animated.timing(value, {
            toValue: maxScale,
            duration: 180 + (index % 4) * 45,
            useNativeDriver: true,
          }),

          Animated.timing(value, {
            toValue: minScale,
            duration: 160 + (index % 3) * 50,
            useNativeDriver: true,
          }),

          Animated.timing(value, {
            toValue: 0.75 + (index % 3) * 0.15,
            duration: 130 + (index % 5) * 35,
            useNativeDriver: true,
          }),
        ]),
      );
    });

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [waveAnimations]);

  const openGallery = (images: any[]) => {
    setGallery(images);
    setGalleryIndex(0);
    setModalVisible(true);
  };

  const nextImage = () => {
    if (!gallery.length) return;

    setGalleryIndex((galleryIndex + 1) % gallery.length);
  };

  const previousImage = () => {
    if (!gallery.length) return;

    setGalleryIndex((galleryIndex - 1 + gallery.length) % gallery.length);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

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
          <Image source={require("../../assets/lo.jpg")} style={styles.logo} />

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 90 + insets.bottom,
        }}
      >
        {/* HERO */}

        <View style={styles.hero}>
          {/* ANIMATED WAVEFORM - nằm phía sau chữ */}
          <View style={styles.waveBackground} pointerEvents="none">
            {Array.from({ length: 50 }).map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveBar,
                  {
                    transform: [
                      {
                        scaleY: waveAnimations[index],
                      },
                    ],
                  },
                ]}
              />
            ))}
          </View>

          {/* TEXT nằm phía trước waveform */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              AUDIO DIRECTOR /{"\n"}
              AUDIO ENGINEER
            </Text>

            <Text style={styles.heroDescription}>
              Live Sound. Studio Recording. Audio Post-Production .
            </Text>
          </View>
        </View>

        {/* FEATURED SHOWS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FEATURED SHOWS</Text>

          {featuredShows
            .slice(0, featuredExpanded ? featuredShows.length : 5)
            .map((show, index) => (
              <Pressable
                key={index}
                style={styles.featuredCard}
                onPress={() => openGallery(show.images)}
              >
                <Image source={show.images[0]} style={styles.featuredImage} />

                <View style={styles.imageOverlay}>
                  <Text style={styles.featuredTitle}>{show.title}</Text>

                  <View style={styles.viewGallery}>
                    <Ionicons name="images-outline" size={15} color={ORANGE} />

                    <Text style={styles.viewGalleryText}>View Gallery</Text>
                  </View>
                </View>
              </Pressable>
            ))}

          <Pressable
            style={styles.showAllButton}
            onPress={() => setFeaturedExpanded(!featuredExpanded)}
          >
            <Text style={styles.showAllText}>
              {featuredExpanded ? "SHOW LESS" : "SHOW ALL"}
            </Text>
          </Pressable>
        </View>

        {/* OTHER SHOWS */}

        <View style={styles.section}>
          <Text style={styles.otherTitle}>OTHER SHOWS</Text>

          <View style={styles.showList}>
            {otherShows
              .slice(0, otherExpanded ? otherShows.length : 6)
              .map(([title, category, image], index) => (
                <Pressable
                  key={index}
                  style={styles.showRow}
                  onPress={() => openGallery([image])}
                >
                  <View style={styles.showInfo}>
                    <Text style={styles.showName} numberOfLines={2}>
                      {title}
                    </Text>
                  </View>

                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{category}</Text>
                  </View>
                </Pressable>
              ))}
          </View>

          <Pressable
            style={styles.showAllButton}
            onPress={() => setOtherExpanded(!otherExpanded)}
          >
            <Text style={styles.showAllText}>
              {otherExpanded ? "SHOW LESS" : "SHOW ALL"}
            </Text>
          </Pressable>
        </View>

        {/* RECORDING PROJECT */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECORDING PROJECT</Text>

          <Pressable
            style={styles.recordingCard}
            onPress={() =>
              openGallery([
                require("../../assets/bosung/1.png"),
                require("../../assets/bosung/2.png"),
                require("../../assets/bosung/3.png"),
                require("../../assets/bosung/4.png"),
                require("../../assets/bosung/5.png"),
                require("../../assets/bosung/6.png"),
                require("../../assets/bosung/7.png"),
                require("../../assets/bosung/8.png"),
                require("../../assets/bosung/9.png"),
                require("../../assets/bosung/10.png"),
              ])
            }
          >
            <Image
              source={require("../../assets/bosung/1.png")}
              style={styles.recordingImage}
            />

            <View style={styles.imageOverlay}>
              <Text style={styles.featuredTitle}>Recording Project</Text>

              <Text style={styles.galleryHint}>Tap to view gallery</Text>
            </View>
          </Pressable>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
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

          <Pressable
            style={styles.facebook}
            onPress={() =>
              Linking.openURL("https://www.facebook.com/tran.haudrum/")
            }
          >
            <Ionicons name="logo-facebook" size={18} color="#fff" />

            <Text style={styles.facebookText}>Facebook</Text>
          </Pressable>

          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              © 2025 Trung Kien & Truc Vy. All rights reserved.
            </Text>

            <Text style={styles.copyrightText}>
              Designed for Sound. Built for Impact.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* IMAGE LIGHTBOX */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close" size={30} color="#fff" />
          </Pressable>

          <Image
            source={gallery[galleryIndex]}
            style={styles.modalImage}
            resizeMode="contain"
          />

          {gallery.length > 1 && (
            <>
              <Pressable
                style={[styles.modalArrow, styles.leftArrow]}
                onPress={previousImage}
              >
                <Ionicons name="chevron-back" size={30} color="#fff" />
              </Pressable>

              <Pressable
                style={[styles.modalArrow, styles.rightArrow]}
                onPress={nextImage}
              >
                <Ionicons name="chevron-forward" size={30} color="#fff" />
              </Pressable>
            </>
          )}

          <Text style={styles.imageCounter}>
            {galleryIndex + 1} / {gallery.length}
          </Text>
        </View>
      </Modal>

      <BottomNav active="Engineer" />
    </View>
  );
}

/* ============================================================
   FOOTER COMPONENTS
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
          paddingBottom: Math.max(insets.bottom, 8),
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
            color={active === tab.label ? ORANGE : "#777"}
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
   STYLE
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0b0b",
  },

  header: {
    minHeight: 58,

    paddingHorizontal: 18,
    paddingBottom: 10,

    backgroundColor: "#111",

    borderBottomWidth: 1,
    borderBottomColor: "#222",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 28,
    height: 28,
    borderRadius: 4,
    marginRight: 9,
  },

  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1,
  },

  languages: {
    flexDirection: "row",
    gap: 4,
  },

  langActive: {
    backgroundColor: ORANGE,
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
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },

 

 hero: {
  minHeight: 190,
  paddingHorizontal: 18,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#080808",
  borderBottomWidth: 1,
  borderBottomColor: "#1a1a1a",
  overflow: "hidden",
  position: "relative",
},

waveBackground: {
  position: "absolute",
  top: 25,
  left: 0,
  right: 0,
  height: 130,

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  gap: 4,
  opacity: 0.55,

  zIndex: 0,
},

waveBar: {
  width: 3,
  height: 60,
  backgroundColor: ORANGE,
  borderRadius: 4,
},

heroContent: {
  position: "relative",
  zIndex: 2,
  alignItems: "center",
  justifyContent: "center",

  // giúp chữ nổi bật hơn waveform phía sau
  paddingVertical: 15,
},

heroTitle: {
  color: "#fff",
  fontSize: 26,
  fontWeight: "800",
  textAlign: "center",
  letterSpacing: 1,
  lineHeight: 32,

  zIndex: 3,
},

heroDescription: {
  color: "#aaa",
  fontSize: 12,
  marginTop: 12,
  textAlign: "center",

  zIndex: 3,
},



  section: {
    paddingHorizontal: 20,
    marginTop: 28,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 15,
  },

  otherTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 12,
  },

  featuredCard: {
    height: 180,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 15,
  },

  featuredImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.68)",
  },

  featuredTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
  },

  viewGallery: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },

  viewGalleryText: {
    color: ORANGE,
    fontSize: 11,
    fontWeight: "700",
  },

  showAllButton: {
    height: 44,
    borderWidth: 1,
    borderColor: ORANGE,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  showAllText: {
    color: ORANGE,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  showList: {
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "#1f1f1f",
    borderRadius: 8,
    paddingHorizontal: 15,
  },

  showRow: {
    minHeight: 60,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  showInfo: {
    flex: 1,
  },

  showName: {
    color: "#ddd",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  badge: {
    backgroundColor: "#1a0a07",
    borderWidth: 1,
    borderColor: "rgba(255,87,34,0.2)",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
  },

  badgeText: {
    color: ORANGE,
    fontSize: 9,
    fontWeight: "700",
  },

  recordingCard: {
    height: 190,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#222",
  },

  recordingImage: {
    width: "100%",
    height: "100%",
  },

  galleryHint: {
    color: "#aaa",
    fontSize: 10,
    marginTop: 5,
  },

  footer: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 80,
    backgroundColor: "#0b0b0b",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },

  emailButton: {
    flex: 1,
    height: 44,
    backgroundColor: ORANGE,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  callButton: {
    flex: 1,
    height: 44,
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  actionText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  accordion: {
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  accordionHeader: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  accordionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  accordionIcon: {
    color: ORANGE,
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

  facebook: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  facebookText: {
    color: "#fff",
    fontSize: 12,
  },

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

  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.96)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalImage: {
    width: "88%",
    height: "75%",
  },

  closeButton: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
  },

  modalArrow: {
    position: "absolute",
    top: "50%",
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  leftArrow: {
    left: 12,
  },

  rightArrow: {
    right: 12,
  },

  imageCounter: {
    position: "absolute",
    bottom: 45,
    color: "#aaa",
    fontSize: 12,
  },

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
    justifyContent: "space-around",
    alignItems: "center",

    paddingTop: 6,

    elevation: 10,
    zIndex: 100,
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
    textAlign: "center",
  },

  bottomActive: {
    color: ORANGE,
  },
});
