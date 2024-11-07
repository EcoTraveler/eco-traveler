"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Camera, Sun, Loader2 } from "lucide-react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Destination {
  id: string;
  provinsi: string;
  destination: {
    name: string;
    description: string;
    imgUrl: string;
    longDescription: string;
    attractions: string[];
    bestTimeToVisit: string;
  };
}

const destinationsData: Destination[] = [
  {
    id: "aceh-masjid-raya",
    provinsi: "Aceh",
    destination: {
      name: "Masjid Raya Baiturrahman",
      description: "Masjid bersejarah yang menjadi ikon Kota Banda Aceh.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg",
      longDescription:
        "Masjid Raya Baiturrahman adalah sebuah masjid bersejarah dan ikonik yang terletak di jantung Kota Banda Aceh. Dibangun pada abad ke-19, masjid ini telah menjadi saksi bisu berbagai peristiwa penting dalam sejarah Aceh. Arsitektur masjid ini menggabungkan unsur-unsur Mughal, Melayu, dan gaya lokal Aceh, menciptakan keindahan yang memukau dengan kubah hitamnya yang khas dan menara-menara yang menjulang tinggi.",
      attractions: ["Arsitektur Indo-Saracenic", "Museum Sejarah Masjid", "Taman dan Air Mancur"],
      bestTimeToVisit: "Oktober hingga April (musim kering)",
    },
  },
  {
    id: "sumut-danau-toba",
    provinsi: "Sumatera Utara",
    destination: {
      name: "Danau Toba",
      description: "Danau vulkanik terbesar di Indonesia dengan Pulau Samosir di tengahnya.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Indonesia_-_Lake_Toba_%2826224127503%29.jpg",
      longDescription:
        "Danau Toba, danau vulkanik terbesar di dunia, terletak di jantung Sumatera Utara. Terbentuk dari letusan supervulkanik sekitar 74.000 tahun lalu, danau ini menawarkan pemandangan alam yang menakjubkan. Pulau Samosir, sebuah pulau vulkanik yang terletak di tengah danau, menjadi pusat budaya Batak dan destinasi wisata populer dengan berbagai atraksi budaya dan alam.",
      attractions: ["Pulau Samosir", "Desa Tradisional Batak", "Air Terjun Sipiso-piso"],
      bestTimeToVisit: "Mei hingga September (musim kering)",
    },
  },
  {
    id: "sumbar-jam-gadang",
    provinsi: "Sumatera Barat",
    destination: {
      name: "Jam Gadang",
      description: "Menara jam besar yang menjadi ikon kota Bukittinggi.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jam_Gadang_memanjang.jpg/1200px-Jam_Gadang_memanjang.jpg",
      longDescription:
        "Jam Gadang adalah menara jam besar yang menjadi ikon dan landmark kota Bukittinggi, Sumatera Barat. Dibangun pada masa kolonial Belanda, menara ini terkenal karena arsitekturnya yang unik dan kisah sejarahnya yang kaya. Jam Gadang juga menjadi titik pusat aktivitas masyarakat dan wisatawan di Bukittinggi.",
      attractions: ["Pasar Atas Bukittinggi", "Museum Bung Hatta", "Kebun Binatang Bukittinggi"],
      bestTimeToVisit: "April hingga September (musim kemarau)",
    },
  },
  {
    id: "riau-istana-siak",
    provinsi: "Riau",
    destination: {
      name: "Istana Siak",
      description: "Istana peninggalan kerajaan Melayu di Kota Siak.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Istana_Kerajaan_Siak_%283%29.jpg",
      longDescription:
        "Istana Siak adalah istana megah peninggalan Kesultanan Siak yang terletak di kota Siak, Riau. Istana ini merupakan simbol kejayaan dan kekuasaan kerajaan Melayu di masa lalu, dengan arsitektur bergaya Eropa dan Melayu yang sangat khas. Di dalamnya terdapat artefak berharga dan koleksi peninggalan sejarah Kesultanan Siak.",
      attractions: ["Museum Kesultanan Siak", "Balairung Seri", "Sungai Siak"],
      bestTimeToVisit: "Juni hingga Agustus",
    },
  },
  {
    id: "kepri-pantai-trikora",
    provinsi: "Kepulauan Riau",
    destination: {
      name: "Pantai Trikora",
      description: "Pantai cantik di Pulau Bintan dengan pasir putih dan air jernih.",
      imgUrl: "https://atourin.obs.ap-southeast-3.myhuaweicloud.com/images/destination/bintan/pantai-trikora-profile1695024664.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim",
      longDescription:
        "Pantai Trikora merupakan salah satu pantai terindah di Pulau Bintan, Kepulauan Riau, dengan pasir putih yang halus dan air laut yang jernih. Pantai ini terkenal dengan keindahan alamnya serta sering dijadikan tujuan untuk kegiatan snorkeling dan berenang.",
      attractions: ["Snorkeling", "Kegiatan Memancing", "Resort Tepi Pantai"],
      bestTimeToVisit: "April hingga Oktober",
    },
  },
  {
    id: "jambi-gunung-kerinci",
    provinsi: "Jambi",
    destination: {
      name: "Gunung Kerinci",
      description: "Gunung tertinggi di Sumatera yang populer untuk pendakian.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Uprising-mount_kerinci.jpg",
      longDescription:
        "Gunung Kerinci adalah gunung berapi tertinggi di Indonesia, terletak di perbatasan Jambi dan Sumatera Barat. Gunung ini menawarkan jalur pendakian menantang dengan pemandangan yang memukau, serta keanekaragaman flora dan fauna yang hanya dapat ditemukan di kawasan hutan pegunungan.",
      attractions: ["Pendakian Gunung", "Observasi Flora dan Fauna", "Danau Gunung Tujuh"],
      bestTimeToVisit: "Juni hingga Agustus (musim kemarau)",
    },
  },
  {
    id: "sumsel-jembatan-ampera",
    provinsi: "Sumatera Selatan",
    destination: {
      name: "Jembatan Ampera",
      description: "Jembatan yang menjadi ikon Kota Palembang.",
      imgUrl: "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1701852720-42dc2d82-a28e-4c71-9031-24f601893bf1-40730-0000049d09df54ae-jpg-medium.jpg",
      longDescription:
        "Jembatan Ampera adalah jembatan gantung yang membentang di atas Sungai Musi dan menjadi ikon Kota Palembang. Jembatan ini menghubungkan bagian utara dan selatan kota dan terkenal karena desainnya yang megah serta pemandangan indah terutama saat malam hari.",
      attractions: ["Wisata Sungai Musi", "Benteng Kuto Besak", "Pasar 16 Ilir"],
      bestTimeToVisit: "Juli hingga September",
    },
  },
  {
    id: "bengkulu-benteng-marlborough",
    provinsi: "Bengkulu",
    destination: {
      name: "Benteng Marlborough",
      description: "Benteng peninggalan Inggris yang bersejarah di Bengkulu.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmThHexRpwT1D5bi4ho7rGmkYqr8QTlwnrA&s",
      longDescription:
        "Benteng Marlborough adalah benteng peninggalan kolonial Inggris yang dibangun pada abad ke-18. Benteng ini berperan penting dalam sejarah kolonial di Bengkulu dan memiliki arsitektur khas Eropa dengan dinding tebal dan bangunan yang kokoh.",
      attractions: ["Ruang Pameran Sejarah", "Taman di Sekitar Benteng", "Pemandangan ke Laut Bengkulu"],
      bestTimeToVisit: "April hingga Oktober (musim kemarau)",
    },
  },
  {
    id: "lampung-way-kambas",
    provinsi: "Lampung",
    destination: {
      name: "Taman Nasional Way Kambas",
      description: "Habitat bagi gajah Sumatera yang dilindungi.",
      imgUrl: "https://asset.kompas.com/crops/Zth1oN7cO0wTZGrIPSnoAymoiUE=/0x0:0x0/1200x800/data/photo/2021/01/05/5ff421715559d.jpeg",
      longDescription: "Taman Nasional Way Kambas adalah cagar alam yang terkenal sebagai habitat gajah Sumatera. Di sini, pengunjung dapat melihat konservasi dan pelatihan gajah serta menikmati lingkungan alam yang asri.",
      attractions: ["Konservasi Gajah", "Wisata Safari", "Pengamatan Burung"],
      bestTimeToVisit: "Juli hingga September",
    },
  },
  {
    id: "babel-tanjung-tinggi",
    provinsi: "Bangka Belitung",
    destination: {
      name: "Pantai Tanjung Tinggi",
      description: "Pantai dengan batuan granit besar yang unik.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lq9yc4mMTPWx9EmXauc28cSxcHcZnSViNQ&s",
      longDescription:
        "Pantai Tanjung Tinggi terkenal dengan batuan granit besar yang tersebar di sepanjang pantainya. Pantai ini memiliki pasir putih yang lembut dan air laut yang jernih, sehingga menjadi salah satu tujuan wisata utama di Bangka Belitung.",
      attractions: ["Fotografi Batu Granit", "Berenang dan Snorkeling", "Kegiatan Memancing"],
      bestTimeToVisit: "April hingga Oktober",
    },
  },
  {
    id: "kalteng-tanjung-puting",
    provinsi: "Kalimantan Tengah",
    destination: {
      name: "Taman Nasional Tanjung Puting",
      description: "Habitat alami orangutan Kalimantan yang dilindungi.",
      imgUrl: "https://web.visitkotawaringinbarat.id/wp-content/uploads/2021/01/Kelotok_Wisata.jpg",
      longDescription:
        "Taman Nasional Tanjung Puting adalah kawasan konservasi alam yang melindungi populasi orangutan Kalimantan. Pengunjung dapat menikmati perjalanan menggunakan kelotok (perahu tradisional) sambil menyaksikan kehidupan liar di sepanjang sungai.",
      attractions: ["Observasi Orangutan", "Jelajah Sungai dengan Kelotok", "Ekowisata Hutan Tropis"],
      bestTimeToVisit: "Juli hingga September",
    },
  },
  {
    id: "kalsel-pasar-terapung",
    provinsi: "Kalimantan Selatan",
    destination: {
      name: "Pasar Terapung Lok Baintan",
      description: "Pasar tradisional di atas perahu di Sungai Martapura.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJZmf7nL-BsgxgOxhtTayZKaHcCuDD5iKzA&s",
      longDescription:
        "Pasar Terapung Lok Baintan adalah pasar tradisional yang diadakan di atas perahu di Sungai Martapura. Pasar ini menyuguhkan pengalaman unik berbelanja langsung dari perahu sambil menyaksikan kehidupan masyarakat sungai di Kalimantan.",
      attractions: ["Belanja di Atas Perahu", "Wisata Kuliner Tradisional", "Fotografi Pasar Terapung"],
      bestTimeToVisit: "Subuh, sepanjang tahun",
    },
  },
  {
    id: "kaltim-derawan",
    provinsi: "Kalimantan Timur",
    destination: {
      name: "Pulau Derawan",
      description: "Pulau dengan keindahan bawah laut yang memukau.",
      imgUrl: "https://jadesta.kemenparekraf.go.id/imgpost/62567.jpg",
      longDescription:
        "Pulau Derawan adalah surga bagi pecinta diving dan snorkeling dengan keanekaragaman biota laut yang memukau. Airnya yang jernih dan terumbu karang yang sehat menjadikan Derawan salah satu destinasi wisata bawah laut terbaik di Indonesia.",
      attractions: ["Diving dan Snorkeling", "Pengamatan Penyu", "Fotografi Alam Bawah Laut"],
      bestTimeToVisit: "Maret hingga Oktober",
    },
  },
  {
    id: "kalut-kayan-mentarang",
    provinsi: "Kalimantan Utara",
    destination: {
      name: "Taman Nasional Kayan Mentarang",
      description: "Taman nasional yang melestarikan hutan hujan tropis Kalimantan.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9QMjE1xh177XwffcAPNrcLbA5Ut_Sroop5Q&s",
      longDescription:
        "Taman Nasional Kayan Mentarang merupakan kawasan hutan hujan tropis yang menjadi rumah bagi berbagai flora dan fauna langka. Taman ini juga memiliki nilai penting sebagai area konservasi di wilayah Kalimantan Utara.",
      attractions: ["Ekowisata Hutan Hujan", "Observasi Satwa Liar", "Trekking dan Jelajah Alam"],
      bestTimeToVisit: "Juni hingga September",
    },
  },
  {
    id: "banten-pantai-anyer",
    provinsi: "Banten",
    destination: {
      name: "Pantai Anyer",
      description: "Pantai populer dekat Jakarta dengan pemandangan indah ke Gunung Krakatau.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7YB1uXm9NX3bMyqtBu1gi1M-EGdyEUFndg&s",
      longDescription:
        "Pantai Anyer adalah destinasi favorit yang terkenal dengan pasir putih dan pemandangan Gunung Krakatau di kejauhan. Lokasinya yang mudah diakses dari Jakarta menjadikan pantai ini tempat yang ideal untuk liburan akhir pekan.",
      attractions: ["Berenang dan Bermain Pasir", "Pemandangan Gunung Krakatau", "Water Sport"],
      bestTimeToVisit: "Mei hingga Oktober",
    },
  },
  {
    id: "jabar-kawah-putih",
    provinsi: "Jawa Barat",
    destination: {
      name: "Kawah Putih",
      description: "Danau kawah dengan air berwarna putih kehijauan di Ciwidey.",
      imgUrl: "https://dirgantaracarrental.com/wp-content/uploads/2017/01/Paket-Wisata-Kawah-Putih-Ciwidey1.jpg",
      longDescription:
        "Kawah Putih adalah danau kawah vulkanik yang terletak di Ciwidey, Jawa Barat, terkenal dengan warna airnya yang putih kehijauan. Suhu dingin di kawasan ini menciptakan suasana sejuk dan menyegarkan, cocok untuk wisata alam.",
      attractions: ["Fotografi Alam", "Wisata Alam", "Trekking"],
      bestTimeToVisit: "Mei hingga Oktober",
    },
  },
  {
    id: "jateng-borobudur",
    provinsi: "Jawa Tengah",
    destination: {
      name: "Candi Borobudur",
      description: "Candi Buddha terbesar di dunia yang termasuk situs Warisan Dunia UNESCO.",
      imgUrl: "https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revision-2019/4.jpg",
      longDescription: "Candi Borobudur adalah candi Buddha terbesar di dunia, terletak di Magelang, Jawa Tengah. Candi ini dihiasi dengan relief yang menceritakan kehidupan Buddha dan dianggap sebagai karya arsitektur yang megah.",
      attractions: ["Ziarah Budaya", "Fotografi Relief", "Trekking ke Bukit Menoreh"],
      bestTimeToVisit: "April hingga Oktober",
    },
  },
  {
    id: "lampung-pahawang",
    provinsi: "Lampung",
    destination: {
      name: "Pulau Pahawang",
      description: "Pulau yang terkenal dengan keindahan bawah lautnya di Lampung.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877819/pahawang-lampung_bkqlg7.webp",
      longDescription:
        "Pulau Pahawang adalah surga bagi para pecinta snorkeling dan diving, dengan terumbu karang yang indah serta berbagai macam ikan tropis. Pulau ini menawarkan air laut yang jernih dan pasir putih yang bersih, serta pemandangan sunset yang memukau.",
      attractions: ["Snorkeling", "Diving", "Pantai Pasir Putih", "Pulau Kelagian"],
      bestTimeToVisit: "Mei hingga Agustus (musim kering)",
    },
  },
  {
    id: "babel-pantai-parai",
    provinsi: "Bangka Belitung",
    destination: {
      name: "Pantai Parai Tenggiri",
      description: "Pantai dengan pasir putih dan bebatuan granit yang eksotis.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877818/pantai-parai-tenggiri_edxuap.jpg",
      longDescription:
        "Pantai Parai Tenggiri terkenal dengan bebatuan granitnya yang besar dan bentuknya yang unik, menciptakan pemandangan yang mempesona. Pantai ini juga memiliki fasilitas water sport dan resort untuk kenyamanan pengunjung.",
      attractions: ["Snorkeling", "Water Sport", "Resort Pinggir Pantai"],
      bestTimeToVisit: "April hingga September",
    },
  },
  {
    id: "banten-tanjung-lesung",
    provinsi: "Banten",
    destination: {
      name: "Tanjung Lesung",
      description: "Destinasi pantai eksklusif di Banten dengan pasir putih dan laut biru.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877819/tanjung-lesung_l5gybp.jpg",
      longDescription:
        "Tanjung Lesung adalah destinasi wisata pantai yang menawarkan suasana yang tenang, ideal untuk berlibur. Pantai ini terkenal dengan pasir putihnya, air yang jernih, dan pemandangan indah untuk menikmati matahari terbenam. Tanjung Lesung juga menjadi destinasi favorit untuk snorkeling dan water sport.",
      attractions: ["Snorkeling", "Resort Pinggir Pantai", "Water Sport", "Spot Foto Sunset"],
      bestTimeToVisit: "April hingga Oktober (musim kemarau)",
    },
  },
  {
    id: "dki-monas",
    provinsi: "DKI Jakarta",
    destination: {
      name: "Monumen Nasional (Monas)",
      description: "Monumen kebanggaan Indonesia yang berlokasi di pusat Jakarta.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877820/monas-dki_ivzk4p.jpg",
      longDescription:
        "Monas adalah simbol perjuangan rakyat Indonesia untuk kemerdekaan. Monumen ini memiliki ketinggian 132 meter dan dilapisi emas di puncaknya. Pengunjung dapat melihat pemandangan kota Jakarta dari puncak monumen dan mengunjungi museum di bagian bawah monumen.",
      attractions: ["Museum Sejarah", "Observasi Kota", "Taman Monas"],
      bestTimeToVisit: "April hingga September",
    },
  },
  {
    id: "jatim-bromo",
    provinsi: "Jawa Timur",
    destination: {
      name: "Gunung Bromo",
      description: "Gunung aktif yang terkenal dengan pemandangan sunrise di Jawa Timur.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877819/gunung-bromo_vx30xa.jpg",
      longDescription:
        "Gunung Bromo adalah destinasi populer bagi wisatawan lokal dan internasional, terutama untuk menikmati matahari terbit yang spektakuler. Pemandangan gunung yang dikelilingi padang pasir vulkanik menjadikannya tempat yang unik dan mempesona.",
      attractions: ["Pendakian Gunung", "Pemandangan Matahari Terbit", "Lautan Pasir"],
      bestTimeToVisit: "Mei hingga September",
    },
  },
  {
    id: "bali-uluwatu",
    provinsi: "Bali",
    destination: {
      name: "Pura Uluwatu",
      description: "Pura tepi tebing di Bali yang menawarkan pemandangan matahari terbenam.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877819/pura-uluwatu-bali_xstjtx.jpg",
      longDescription: "Pura Uluwatu adalah pura Hindu yang terletak di atas tebing tinggi, menawarkan pemandangan Samudra Hindia yang menakjubkan. Pura ini terkenal dengan pertunjukan tari kecak saat matahari terbenam.",
      attractions: ["Pura Hindu", "Pemandangan Sunset", "Tari Kecak"],
      bestTimeToVisit: "Juli hingga Oktober",
    },
  },
  {
    id: "ntt-komodo",
    provinsi: "Nusa Tenggara Timur",
    destination: {
      name: "Taman Nasional Komodo",
      description: "Habitat asli komodo dan pantai berwarna merah muda yang unik.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877819/pulau-komodo_zl8wrz.jpg",
      longDescription: "Taman Nasional Komodo adalah rumah bagi kadal komodo yang hanya ditemukan di Indonesia. Taman ini juga memiliki pantai berpasir merah muda yang disebut Pantai Pink, serta pemandangan alam yang luar biasa.",
      attractions: ["Pantai Pink", "Pengamatan Komodo", "Snorkeling dan Diving"],
      bestTimeToVisit: "April hingga Juni",
    },
  },
  {
    id: "papua-raja-ampat",
    provinsi: "Papua Barat",
    destination: {
      name: "Raja Ampat",
      description: "Kepulauan yang terkenal dengan keindahan alam bawah lautnya.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877820/raja-ampat_tanj1b.jpg",
      longDescription: "Raja Ampat adalah surga bagi penyelam dengan terumbu karang yang kaya akan keanekaragaman hayati. Kepulauan ini memiliki pemandangan alam yang sangat memukau, baik di atas maupun di bawah laut.",
      attractions: ["Diving dan Snorkeling", "Pemandangan Kepulauan", "Birdwatching"],
      bestTimeToVisit: "Oktober hingga April",
    },
  },
  {
    id: "sumbar-jam-gadang",
    provinsi: "Sumatera Barat",
    destination: {
      name: "Jam Gadang",
      description: "Menara jam besar yang menjadi ikon kota Bukittinggi.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jam_Gadang_memanjang.jpg/1200px-Jam_Gadang_memanjang.jpg",
      longDescription:
        "Jam Gadang adalah ikon Bukittinggi yang memiliki sejarah menarik. Menara jam ini dibangun pada masa kolonial Belanda dan menjadi salah satu landmark penting di Sumatera Barat. Selain keunikannya, Jam Gadang memiliki jam mekanik yang sama dengan jam Big Ben di London.",
      attractions: ["Taman Jam Gadang", "Pasar Atas Bukittinggi", "Museum Benteng Fort de Kock"],
      bestTimeToVisit: "Mei hingga September (musim kering)",
    },
  },
  {
    id: "riau-istana-siak",
    provinsi: "Riau",
    destination: {
      name: "Istana Siak",
      description: "Istana peninggalan kerajaan Melayu di Kota Siak.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Istana_Kerajaan_Siak_%283%29.jpg",
      longDescription:
        "Istana Siak Sri Indrapura merupakan peninggalan Kerajaan Melayu yang megah dan memiliki arsitektur yang kaya akan pengaruh Eropa, Arab, dan Melayu. Istana ini menyimpan berbagai peninggalan bersejarah dan menjadi museum yang terbuka bagi wisatawan.",
      attractions: ["Ruang Tahta Sultan", "Museum Kerajaan Siak", "Pertunjukan Tari Melayu"],
      bestTimeToVisit: "Maret hingga Agustus (musim kering)",
    },
  },
  {
    id: "kepri-pantai-trikora",
    provinsi: "Kepulauan Riau",
    destination: {
      name: "Pantai Trikora",
      description: "Pantai cantik di Pulau Bintan dengan pasir putih dan air jernih.",
      imgUrl: "https://atourin.obs.ap-southeast-3.myhuaweicloud.com/images/destination/bintan/pantai-trikora-profile1695024664.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim",
      longDescription:
        "Pantai Trikora di Pulau Bintan terkenal akan keindahan pasir putihnya yang bersih dan air laut yang jernih. Pantai ini menawarkan berbagai aktivitas seperti snorkeling, berenang, dan bersantai sambil menikmati pemandangan laut yang memukau.",
      attractions: ["Snorkeling dan Diving", "Resort dan Kafe Pinggir Pantai", "Spot Foto Alam"],
      bestTimeToVisit: "April hingga Oktober (musim panas)",
    },
  },
  {
    id: "jambi-gunung-kerinci",
    provinsi: "Jambi",
    destination: {
      name: "Gunung Kerinci",
      description: "Gunung tertinggi di Sumatera yang populer untuk pendakian.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Uprising-mount_kerinci.jpg",
      longDescription:
        "Gunung Kerinci, sebagai gunung tertinggi di Sumatera, menawarkan petualangan mendaki dengan pemandangan alam yang indah. Gunung ini juga merupakan habitat penting bagi berbagai flora dan fauna endemik Sumatera, seperti harimau dan badak Sumatera.",
      attractions: ["Pendakian Gunung", "Pemandangan Matahari Terbit", "Pengamatan Flora dan Fauna"],
      bestTimeToVisit: "Mei hingga Oktober (musim kemarau)",
    },
  },
  {
    id: "sumsel-jembatan-ampera",
    provinsi: "Sumatera Selatan",
    destination: {
      name: "Jembatan Ampera",
      description: "Jembatan yang menjadi ikon Kota Palembang.",
      imgUrl: "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1701852720-42dc2d82-a28e-4c71-9031-24f601893bf1-40730-0000049d09df54ae-jpg-medium.jpg",
      longDescription:
        "Jembatan Ampera merupakan landmark ikonik Kota Palembang yang membentang di atas Sungai Musi. Jembatan ini memiliki sejarah panjang sebagai simbol koneksi antara wilayah Ulu dan Ilir, serta pemandangan malam yang memukau.",
      attractions: ["Sungai Musi Cruise", "Pasar Tradisional Palembang", "Pemandangan Malam"],
      bestTimeToVisit: "September hingga November",
    },
  },
  {
    id: "bengkulu-benteng-marlborough",
    provinsi: "Bengkulu",
    destination: {
      name: "Benteng Marlborough",
      description: "Benteng peninggalan Inggris yang bersejarah di Bengkulu.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmThHexRpwT1D5bi4ho7rGmkYqr8QTlwnrA&s",
      longDescription: "Benteng Marlborough adalah benteng kolonial yang dibangun oleh Inggris pada abad ke-18 di Bengkulu. Dengan arsitektur khas kolonial, benteng ini kini menjadi museum yang mengisahkan sejarah masa lalu Bengkulu.",
      attractions: ["Tur Benteng", "Museum Kolonial", "Pemandangan Laut"],
      bestTimeToVisit: "April hingga September (musim kemarau)",
    },
  },
];

const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"];

export default function DetailedDestinationPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [coordinates, setCoordinates] = useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries,
  });

  useEffect(() => {
    const foundDestination = destinationsData.find(dest => dest.id === id);
    setDestination(foundDestination || null);
  }, [id]);

  useEffect(() => {
    if (destination && isLoaded) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: `${destination.destination.name}, ${destination.provinsi}, Indonesia`,
        },
        (results, status) => {
          if (status === "OK" && results && results[0]) {
            const { lat, lng } = results[0].geometry.location;
            setCoordinates({ lat: lat(), lng: lng() });
          } else {
            console.error("Geocode was not successful for the following reason: " + status);
          }
        }
      );
    }
  }, [destination, isLoaded]);

  const mapRef = useCallback(
    (node: google.maps.Map | null) => {
      if (node !== null && coordinates) {
        node.panTo(coordinates);
      }
    },
    [coordinates]
  );

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Maps</h2>
          <p className="text-gray-600">We're having trouble loading the map. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!isLoaded || !destination) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <Skeleton className="h-12 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Skeleton className="h-[400px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-8 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6 mb-2" />
                      <Skeleton className="h-4 w-4/6" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-8 w-1/3" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-[300px] w-full rounded-lg" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-[300px] md:h-[400px]">
            <Image src={destination.destination.imgUrl} alt={destination.destination.name} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{destination.destination.name}</h1>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>{destination.provinsi}</span>
              </div>
            </div>
          </div>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg">{destination.destination.longDescription}</p>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="mr-2 h-5 w-5" /> Main Attractions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {destination.destination.attractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Sun className="mr-2 h-5 w-5" /> Best Time to Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{destination.destination.bestTimeToVisit}</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" /> Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {coordinates ? (
                      <GoogleMap mapContainerClassName="w-full h-[400px] rounded-lg" center={coordinates} zoom={14} onLoad={mapRef}>
                        <Marker position={coordinates} />
                      </GoogleMap>
                    ) : (
                      <div className="w-full h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
