// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import { MapPin } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useRouter } from 'next/navigation'

// interface Destination {
//   provinsi: string;
//   destination: {
//     name: string;
//     description: string;
//     imgUrl: string;
//   };
// }

// const destinationsData: Destination[] = [
//   {
//     provinsi: "Aceh",
//     destination: {
//       name: "Masjid Raya Baiturrahman",
//       description: "Masjid bersejarah yang menjadi ikon Kota Banda Aceh.",
//       imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg",
//     },
//   },
//   {
//     provinsi: "Sumatera Utara",
//     destination: {
//       name: "Danau Toba",
//       description: "Danau vulkanik terbesar di Indonesia dengan Pulau Samosir di tengahnya.",
//       imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Indonesia_-_Lake_Toba_%2826224127503%29.jpg",
//     },
//   },
//   {
//     provinsi: "Sumatera Barat",
//     destination: {
//       name: "Jam Gadang",
//       description: "Menara jam besar yang menjadi ikon kota Bukittinggi.",
//       imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jam_Gadang_memanjang.jpg/1200px-Jam_Gadang_memanjang.jpg",
//     },
//   },
//   {
//     provinsi: "Riau",
//     destination: {
//       name: "Istana Siak",
//       description: "Istana peninggalan kerajaan Melayu di Kota Siak.",
//       imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Istana_Kerajaan_Siak_%283%29.jpg",
//     },
//   },
//   {
//     provinsi: "Kepulauan Riau",
//     destination: {
//       name: "Pantai Trikora",
//       description: "Pantai cantik di Pulau Bintan dengan pasir putih dan air jernih.",
//       imgUrl: "https://atourin.obs.ap-southeast-3.myhuaweicloud.com/images/destination/bintan/pantai-trikora-profile1695024664.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim",
//     },
//   },
//   {
//     provinsi: "Jambi",
//     destination: {
//       name: "Gunung Kerinci",
//       description: "Gunung tertinggi di Sumatera yang populer untuk pendakian.",
//       imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Uprising-mount_kerinci.jpg",
//     },
//   },
//   {
//     provinsi: "Sumatera Selatan",
//     destination: {
//       name: "Jembatan Ampera",
//       description: "Jembatan yang menjadi ikon Kota Palembang.",
//       imgUrl: "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1701852720-42dc2d82-a28e-4c71-9031-24f601893bf1-40730-0000049d09df54ae-jpg-medium.jpg",
//     },
//   },
//   {
//     provinsi: "Bengkulu",
//     destination: {
//       name: "Benteng Marlborough",
//       description: "Benteng peninggalan Inggris yang bersejarah di Bengkulu.",
//       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmThHexRpwT1D5bi4ho7rGmkYqr8QTlwnrA&s",
//     },
//   },
//   {
//     provinsi: "Lampung",
//     destination: {
//       name: "Taman Nasional Way Kambas",
//       description: "Habitat bagi gajah Sumatera yang dilindungi.",
//       imgUrl: "https://asset.kompas.com/crops/Zth1oN7cO0wTZGrIPSnoAymoiUE=/0x0:0x0/1200x800/data/photo/2021/01/05/5ff421715559d.jpeg",
//     },
//   },
//   {
//     provinsi: "Bangka Belitung",
//     destination: {
//       name: "Pantai Tanjung Tinggi",
//       description: "Pantai dengan batuan granit besar yang unik.",
//       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lq9yc4mMTPWx9EmXauc28cSxcHcZnSViNQ&s",
//     },
//   },
//   {
//     provinsi: "Kalimantan Tengah",
//     destination: {
//       name: "Taman Nasional Tanjung Puting",
//       description: "Habitat alami orangutan Kalimantan yang dilindungi.",
//       imgUrl: "https://web.visitkotawaringinbarat.id/wp-content/uploads/2021/01/Kelotok_Wisata.jpg",
//     },
//   },
//   {
//     provinsi: "Kalimantan Selatan",
//     destination: {
//       name: "Pasar Terapung Lok Baintan",
//       description: "Pasar tradisional di atas perahu di Sungai Martapura.",
//       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJZmf7nL-BsgxgOxhtTayZKaHcCuDD5iKzA&s",
//     },
//   },
//   {
//     provinsi: "Kalimantan Timur",
//     destination: {
//       name: "Pulau Derawan",
//       description: "Pulau dengan keindahan bawah laut yang memukau.",
//       imgUrl: "https://jadesta.kemenparekraf.go.id/imgpost/62567.jpg",
//     },
//   },
//   {
//     provinsi: "Kalimantan Utara",
//     destination: {
//       name: "Taman Nasional Kayan Mentarang",
//       description: "Taman nasional yang melestarikan hutan hujan tropis Kalimantan.",
//       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9QMjE1xh177XwffcAPNrcLbA5Ut_Sroop5Q&s",
//     },
//   },
//   {
//     provinsi: "Banten",
//     destination: {
//       name: "Pantai Anyer",
//       description: "Pantai populer dekat Jakarta dengan pemandangan indah ke Gunung Krakatau.",
//       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7YB1uXm9NX3bMyqtBu1gi1M-EGdyEUFndg&s",
//     },
//   },
//   {
//     provinsi: "Jawa Barat",
//     destination: {
//       name: "Kawah Putih",
//       description: "Danau kawah dengan air berwarna putih kehijauan di Ciwidey.",
//       imgUrl: "https://dirgantaracarrental.com/wp-content/uploads/2017/01/Paket-Wisata-Kawah-Putih-Ciwidey1.jpg",
//     },
//   },
//   {
//     provinsi: "Jawa Tengah",
//     destination: {
//       name: "Candi Borobudur",
//       description: "Candi Buddha terbesar di dunia yang termasuk situs Warisan Dunia UNESCO.",
//       imgUrl: "https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revision-2019/4.jpg",
//     },
//   },
//   {
//     provinsi: "DI Yogyakarta",
//     destination: {
//       name: "Malioboro",
//       description: "Jalan terkenal untuk berbelanja dan mencicipi kuliner khas Yogyakarta.",
//       imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Malioboro_Street%2C_Yogyakarta.JPG/1200px-Malioboro_Street%2C_Yogyakarta.JPG",
//     },
//   },
//   {
//     provinsi: "Jawa Timur",
//     destination: {
//       name: "Gunung Bromo",
//       description: "Gunung berapi aktif dengan pemandangan sunrise yang memukau.",
//       imgUrl: "https://www.pesonaindo.com/wp-content/uploads/2016/04/bromo.jpg",
//     },
//   },
//   {
//     provinsi: "Bali",
//     destination: {
//       name: "Pantai Kuta",
//       description: "Pantai dengan ombak yang cocok untuk berselancar dan matahari terbenam yang indah.",
//       imgUrl: "https://cinchy.life/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fpj3idduy0ni9%2F2BsaLfhco58uafWL3eDtDf%2F5aa74e43e3a26a0da9fa8cf78ca4f0a7%2Fwisata-pantai-kuta-bali.jpg&w=3840&q=75",
//     },
//   },
//   {
//     provinsi: "Nusa Tenggara Barat",
//     destination: {
//       name: "Gunung Rinjani",
//       description: "Gunung tertinggi kedua di Indonesia dengan pemandangan indah.",
//       imgUrl: "https://torch.id/cdn/shop/articles/1706999589_Preview_12782da7-0e30-4f27-a52d-142ad405ef12.jpg?v=1706999596&width=1100",
//     },
//   },
//   {
//     provinsi: "Nusa Tenggara Timur",
//     destination: {
//       name: "Taman Nasional Komodo",
//       description: "Habitat komodo dan pemandangan pantai serta laut yang indah.",
//       imgUrl: "https://asset.kompas.com/crops/vdZhnhd65omILwbPWGk6C_Vdsp0=/0x0:780x520/1200x800/data/photo/2019/09/26/5d8c64544d656.jpg",
//     },
//   },
//   {
//     provinsi: "Sulawesi Utara",
//     destination: {
//       name: "Taman Laut Bunaken",
//       description: "Taman laut dengan keanekaragaman biota laut yang luar biasa.",
//       imgUrl: "https://ik.imagekit.io/tvlk/blog/2020/01/keindahan-alam-indonesia-5-Super-Adventure.jpg?tr=dpr-2,w-675",
//     },
//   },
//   {
//     provinsi: "Sulawesi Tengah",
//     destination: {
//       name: "Togean Islands",
//       description: "Kepulauan dengan pantai pasir putih dan spot snorkeling.",
//       imgUrl: "https://pinkplankton.com/wp-content/uploads/2020/04/togean-islands-fadhila-cottages-2.jpg",
//     },
//   },
//   {
//     provinsi: "Sulawesi Selatan",
//     destination: {
//       name: "Tana Toraja",
//       description: "Daerah wisata budaya dengan tradisi pemakaman unik.",
//       imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxDcUHPW5hWIAfiKB6xDm0zeI8daJZEzyEg&s",
//     },
//   },
//   {
//     provinsi: "Sulawesi Tenggara",
//     destination: {
//       name: "Wakatobi",
//       description: "Destinasi menyelam terkenal dengan terumbu karang yang mempesona.",
//       imgUrl: "https://www.indonesia.travel/content/dam/indtravelrevamp/id-id/ide-liburan/image-artikel-7-hal-tentang-wakatobi-yang-wajib-kamu-tahu-5.png",
//     },
//   },
//   {
//     provinsi: "Gorontalo",
//     destination: {
//       name: "Pulau Saronde",
//       description: "Pulau kecil dengan pantai pasir putih dan keindahan alam.",
//       imgUrl: "https://img.okezone.com/content/2021/04/20/406/2397482/pengunjung-pulau-saronde-dominan-warga-lokal-selama-pandemi-vjY7810zeI.JPG",
//     },
//   },
//   {
//     provinsi: "Maluku",
//     destination: {
//       name: "Pantai Ora",
//       description: "Pantai dengan air jernih dan kehidupan laut yang mempesona.",
//       imgUrl: "https://cdn.wisata.app/diary/ded32177-a0a8-44ec-850b-1d20e71a6839.jpg",
//     },
//   },
//   {
//     provinsi: "Maluku Utara",
//     destination: {
//       name: "Pulau Morotai",
//       description: "Pulau dengan sejarah Perang Dunia II dan pantai eksotis.",
//       imgUrl: "https://wonderful.pulaumorotaikab.go.id/gambar/aktifitas/aktifitas-mengayuh-perahu-di-birunya-laut-morotai-4-l.jpg",
//     },
//   },
//   {
//     provinsi: "Papua Barat",
//     destination: {
//       name: "Raja Ampat",
//       description: "Kepulauan dengan keindahan bawah laut yang mempesona.",
//       imgUrl: "https://res.cloudinary.com/zublu/image/fetch/f_webp,w_1200,q_auto/https://www.zubludiving.com/images/Indonesia/West-Papua/Raja-Ampat/Raja-Ampat-Wayag-Diving.jpg",
//     },
//   },
//   {
//     provinsi: "Papua",
//     destination: {
//       name: "Danau Sentani",
//       description: "Danau luas yang terkenal dengan pemandangan dan festival budaya.",
//       imgUrl: "https://cdn.idntimes.com/content-images/post/20191008/2-06d20df9484233c2ab6414a410ed7104.jpg",
//     },
//   },
// ];

// export default function DestinationsPage() {
//   const [destinations, setDestinations] = useState<Destination[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter()

//   useEffect(() => {
//     // Simulate API call delay
//     const timer = setTimeout(() => {
//       setDestinations(destinationsData);
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//     },
//   };

//   const handleDestinationClick = (destination: Destination) => {
//     const searchQuery = `${destination.destination.name}, ${destination.provinsi}`
//     router.push(`/google-maps?search=${encodeURIComponent(searchQuery)}`)
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <motion.h1 className="text-4xl font-bold text-center mb-8" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//           Discover Destination
//         </motion.h1>

//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//               <Card key={index} className="overflow-hidden rounded-xl border-none">
//                 <CardContent className="p-0">
//                   <div className="relative">
//                     <Skeleton className="h-64 w-full" />
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
//                       <Skeleton className="h-6 w-3/4 bg-white/50" />
//                       <div className="mt-1 flex items-center space-x-2">
//                         <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
//                         <Skeleton className="h-4 w-1/2 bg-white/50" />
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
//           {destinations.map((item, index) => (
//             <motion.div key={index} variants={itemVariants} onClick={() => handleDestinationClick(item)}>
//               <Card className="group overflow-hidden rounded-xl border-none cursor-pointer">
//                 <CardContent className="p-0">
//                   <div className="relative">
//                     <div className="relative h-64">
//                       <Image
//                         src={item.destination.imgUrl}
//                         alt={item.destination.name}
//                         className="object-cover transition-transform duration-300 group-hover:scale-110"
//                         fill
//                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       />
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
//                       <h3 className="text-xl font-semibold">{item.destination.name}</h3>
//                       <div className="mt-1 flex items-center space-x-2">
//                         <MapPin className="h-4 w-4" />
//                         <span className="text-sm">{item.provinsi}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </motion.div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }


'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { MapPin } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from 'next/link'

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
      longDescription: "Masjid Raya Baiturrahman adalah sebuah masjid bersejarah dan ikonik yang terletak di jantung Kota Banda Aceh. Dibangun pada abad ke-19, masjid ini telah menjadi saksi bisu berbagai peristiwa penting dalam sejarah Aceh. Arsitektur masjid ini menggabungkan unsur-unsur Mughal, Melayu, dan gaya lokal Aceh, menciptakan keindahan yang memukau dengan kubah hitamnya yang khas dan menara-menara yang menjulang tinggi.",
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
      longDescription: "Danau Toba, danau vulkanik terbesar di dunia, terletak di jantung Sumatera Utara. Terbentuk dari letusan supervulkanik sekitar 74.000 tahun lalu, danau ini menawarkan pemandangan alam yang menakjubkan. Pulau Samosir, sebuah pulau vulkanik yang terletak di tengah danau, menjadi pusat budaya Batak dan destinasi wisata populer dengan berbagai atraksi budaya dan alam.",
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
      longDescription: "Jam Gadang adalah menara jam besar yang menjadi ikon dan landmark kota Bukittinggi, Sumatera Barat. Dibangun pada masa kolonial Belanda, menara ini terkenal karena arsitekturnya yang unik dan kisah sejarahnya yang kaya. Jam Gadang juga menjadi titik pusat aktivitas masyarakat dan wisatawan di Bukittinggi.",
      attractions: ["Pasar Atas Bukittinggi", "Museum Bung Hatta", "Kebun Binatang Bukittinggi"],
      bestTimeToVisit: "April hingga September (musim kemarau)"
    }
  },
  {
    id: "riau-istana-siak",
    provinsi: "Riau",
    destination: {
      name: "Istana Siak",
      description: "Istana peninggalan kerajaan Melayu di Kota Siak.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Istana_Kerajaan_Siak_%283%29.jpg",
      longDescription: "Istana Siak adalah istana megah peninggalan Kesultanan Siak yang terletak di kota Siak, Riau. Istana ini merupakan simbol kejayaan dan kekuasaan kerajaan Melayu di masa lalu, dengan arsitektur bergaya Eropa dan Melayu yang sangat khas. Di dalamnya terdapat artefak berharga dan koleksi peninggalan sejarah Kesultanan Siak.",
      attractions: ["Museum Kesultanan Siak", "Balairung Seri", "Sungai Siak"],
      bestTimeToVisit: "Juni hingga Agustus"
    }
  },
  {
    id: "kepri-pantai-trikora",
    provinsi: "Kepulauan Riau",
    destination: {
      name: "Pantai Trikora",
      description: "Pantai cantik di Pulau Bintan dengan pasir putih dan air jernih.",
      imgUrl: "https://atourin.obs.ap-southeast-3.myhuaweicloud.com/images/destination/bintan/pantai-trikora-profile1695024664.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim",
      longDescription: "Pantai Trikora merupakan salah satu pantai terindah di Pulau Bintan, Kepulauan Riau, dengan pasir putih yang halus dan air laut yang jernih. Pantai ini terkenal dengan keindahan alamnya serta sering dijadikan tujuan untuk kegiatan snorkeling dan berenang.",
      attractions: ["Snorkeling", "Kegiatan Memancing", "Resort Tepi Pantai"],
      bestTimeToVisit: "April hingga Oktober"
    }
  },
  {
    id: "jambi-gunung-kerinci",
    provinsi: "Jambi",
    destination: {
      name: "Gunung Kerinci",
      description: "Gunung tertinggi di Sumatera yang populer untuk pendakian.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Uprising-mount_kerinci.jpg",
      longDescription: "Gunung Kerinci adalah gunung berapi tertinggi di Indonesia, terletak di perbatasan Jambi dan Sumatera Barat. Gunung ini menawarkan jalur pendakian menantang dengan pemandangan yang memukau, serta keanekaragaman flora dan fauna yang hanya dapat ditemukan di kawasan hutan pegunungan.",
      attractions: ["Pendakian Gunung", "Observasi Flora dan Fauna", "Danau Gunung Tujuh"],
      bestTimeToVisit: "Juni hingga Agustus (musim kemarau)"
    }
  },
  {
    id: "sumsel-jembatan-ampera",
    provinsi: "Sumatera Selatan",
    destination: {
      name: "Jembatan Ampera",
      description: "Jembatan yang menjadi ikon Kota Palembang.",
      imgUrl: "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1701852720-42dc2d82-a28e-4c71-9031-24f601893bf1-40730-0000049d09df54ae-jpg-medium.jpg",
      longDescription: "Jembatan Ampera adalah jembatan gantung yang membentang di atas Sungai Musi dan menjadi ikon Kota Palembang. Jembatan ini menghubungkan bagian utara dan selatan kota dan terkenal karena desainnya yang megah serta pemandangan indah terutama saat malam hari.",
      attractions: ["Wisata Sungai Musi", "Benteng Kuto Besak", "Pasar 16 Ilir"],
      bestTimeToVisit: "Juli hingga September"
    }
  },
  {
    id: "bengkulu-benteng-marlborough",
    provinsi: "Bengkulu",
    destination: {
      name: "Benteng Marlborough",
      description: "Benteng peninggalan Inggris yang bersejarah di Bengkulu.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmThHexRpwT1D5bi4ho7rGmkYqr8QTlwnrA&s",
      longDescription: "Benteng Marlborough adalah benteng peninggalan kolonial Inggris yang dibangun pada abad ke-18. Benteng ini berperan penting dalam sejarah kolonial di Bengkulu dan memiliki arsitektur khas Eropa dengan dinding tebal dan bangunan yang kokoh.",
      attractions: ["Ruang Pameran Sejarah", "Taman di Sekitar Benteng", "Pemandangan ke Laut Bengkulu"],
      bestTimeToVisit: "April hingga Oktober (musim kemarau)"
    }
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
      bestTimeToVisit: "Juli hingga September"
    }
  },
  {
    id: "babel-tanjung-tinggi",
    provinsi: "Bangka Belitung",
    destination: {
      name: "Pantai Tanjung Tinggi",
      description: "Pantai dengan batuan granit besar yang unik.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lq9yc4mMTPWx9EmXauc28cSxcHcZnSViNQ&s",
      longDescription: "Pantai Tanjung Tinggi terkenal dengan batuan granit besar yang tersebar di sepanjang pantainya. Pantai ini memiliki pasir putih yang lembut dan air laut yang jernih, sehingga menjadi salah satu tujuan wisata utama di Bangka Belitung.",
      attractions: ["Fotografi Batu Granit", "Berenang dan Snorkeling", "Kegiatan Memancing"],
      bestTimeToVisit: "April hingga Oktober"
    }
  },
  {
    id: "kalteng-tanjung-puting",
    provinsi: "Kalimantan Tengah",
    destination: {
      name: "Taman Nasional Tanjung Puting",
      description: "Habitat alami orangutan Kalimantan yang dilindungi.",
      imgUrl: "https://web.visitkotawaringinbarat.id/wp-content/uploads/2021/01/Kelotok_Wisata.jpg",
      longDescription: "Taman Nasional Tanjung Puting adalah kawasan konservasi alam yang melindungi populasi orangutan Kalimantan. Pengunjung dapat menikmati perjalanan menggunakan kelotok (perahu tradisional) sambil menyaksikan kehidupan liar di sepanjang sungai.",
      attractions: ["Observasi Orangutan", "Jelajah Sungai dengan Kelotok", "Ekowisata Hutan Tropis"],
      bestTimeToVisit: "Juli hingga September"
    }
  },
  {
    id: "kalsel-pasar-terapung",
    provinsi: "Kalimantan Selatan",
    destination: {
      name: "Pasar Terapung Lok Baintan",
      description: "Pasar tradisional di atas perahu di Sungai Martapura.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJZmf7nL-BsgxgOxhtTayZKaHcCuDD5iKzA&s",
      longDescription: "Pasar Terapung Lok Baintan adalah pasar tradisional yang diadakan di atas perahu di Sungai Martapura. Pasar ini menyuguhkan pengalaman unik berbelanja langsung dari perahu sambil menyaksikan kehidupan masyarakat sungai di Kalimantan.",
      attractions: ["Belanja di Atas Perahu", "Wisata Kuliner Tradisional", "Fotografi Pasar Terapung"],
      bestTimeToVisit: "Subuh, sepanjang tahun"
    }
  },
  {
    id: "kaltim-derawan",
    provinsi: "Kalimantan Timur",
    destination: {
      name: "Pulau Derawan",
      description: "Pulau dengan keindahan bawah laut yang memukau.",
      imgUrl: "https://jadesta.kemenparekraf.go.id/imgpost/62567.jpg",
      longDescription: "Pulau Derawan adalah surga bagi pecinta diving dan snorkeling dengan keanekaragaman biota laut yang memukau. Airnya yang jernih dan terumbu karang yang sehat menjadikan Derawan salah satu destinasi wisata bawah laut terbaik di Indonesia.",
      attractions: ["Diving dan Snorkeling", "Pengamatan Penyu", "Fotografi Alam Bawah Laut"],
      bestTimeToVisit: "Maret hingga Oktober"
    }
  },
  {
    id: "kalut-kayan-mentarang",
    provinsi: "Kalimantan Utara",
    destination: {
      name: "Taman Nasional Kayan Mentarang",
      description: "Taman nasional yang melestarikan hutan hujan tropis Kalimantan.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9QMjE1xh177XwffcAPNrcLbA5Ut_Sroop5Q&s",
      longDescription: "Taman Nasional Kayan Mentarang merupakan kawasan hutan hujan tropis yang menjadi rumah bagi berbagai flora dan fauna langka. Taman ini juga memiliki nilai penting sebagai area konservasi di wilayah Kalimantan Utara.",
      attractions: ["Ekowisata Hutan Hujan", "Observasi Satwa Liar", "Trekking dan Jelajah Alam"],
      bestTimeToVisit: "Juni hingga September"
    }
  },
  {
    id: "banten-pantai-anyer",
    provinsi: "Banten",
    destination: {
      name: "Pantai Anyer",
      description: "Pantai populer dekat Jakarta dengan pemandangan indah ke Gunung Krakatau.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7YB1uXm9NX3bMyqtBu1gi1M-EGdyEUFndg&s",
      longDescription: "Pantai Anyer adalah destinasi favorit yang terkenal dengan pasir putih dan pemandangan Gunung Krakatau di kejauhan. Lokasinya yang mudah diakses dari Jakarta menjadikan pantai ini tempat yang ideal untuk liburan akhir pekan.",
      attractions: ["Berenang dan Bermain Pasir", "Pemandangan Gunung Krakatau", "Water Sport"],
      bestTimeToVisit: "Mei hingga Oktober"
    }
  },
  {
    id: "jabar-kawah-putih",
    provinsi: "Jawa Barat",
    destination: {
      name: "Kawah Putih",
      description: "Danau kawah dengan air berwarna putih kehijauan di Ciwidey.",
      imgUrl: "https://dirgantaracarrental.com/wp-content/uploads/2017/01/Paket-Wisata-Kawah-Putih-Ciwidey1.jpg",
      longDescription: "Kawah Putih adalah danau kawah vulkanik yang terletak di Ciwidey, Jawa Barat, terkenal dengan warna airnya yang putih kehijauan. Suhu dingin di kawasan ini menciptakan suasana sejuk dan menyegarkan, cocok untuk wisata alam.",
      attractions: ["Fotografi Alam", "Wisata Alam", "Trekking"],
      bestTimeToVisit: "Mei hingga Oktober"
    }
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
      bestTimeToVisit: "April hingga Oktober"
    }
  },
  {
    id: "lampung-pahawang",
    provinsi: "Lampung",
    destination: {
      name: "Pulau Pahawang",
      description: "Pulau yang terkenal dengan keindahan bawah lautnya di Lampung.",
      imgUrl: "https://res.cloudinary.com/dqczvxzoq/image/upload/v1730877819/pahawang-lampung_bkqlg7.webp",
      longDescription: "Pulau Pahawang adalah surga bagi para pecinta snorkeling dan diving, dengan terumbu karang yang indah serta berbagai macam ikan tropis. Pulau ini menawarkan air laut yang jernih dan pasir putih yang bersih, serta pemandangan sunset yang memukau.",
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
      longDescription: "Pantai Parai Tenggiri terkenal dengan bebatuan granitnya yang besar dan bentuknya yang unik, menciptakan pemandangan yang mempesona. Pantai ini juga memiliki fasilitas water sport dan resort untuk kenyamanan pengunjung.",
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
      longDescription: "Tanjung Lesung adalah destinasi wisata pantai yang menawarkan suasana yang tenang, ideal untuk berlibur. Pantai ini terkenal dengan pasir putihnya, air yang jernih, dan pemandangan indah untuk menikmati matahari terbenam. Tanjung Lesung juga menjadi destinasi favorit untuk snorkeling dan water sport.",
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
      longDescription: "Monas adalah simbol perjuangan rakyat Indonesia untuk kemerdekaan. Monumen ini memiliki ketinggian 132 meter dan dilapisi emas di puncaknya. Pengunjung dapat melihat pemandangan kota Jakarta dari puncak monumen dan mengunjungi museum di bagian bawah monumen.",
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
      longDescription: "Gunung Bromo adalah destinasi populer bagi wisatawan lokal dan internasional, terutama untuk menikmati matahari terbit yang spektakuler. Pemandangan gunung yang dikelilingi padang pasir vulkanik menjadikannya tempat yang unik dan mempesona.",
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
      longDescription: "Jam Gadang adalah ikon Bukittinggi yang memiliki sejarah menarik. Menara jam ini dibangun pada masa kolonial Belanda dan menjadi salah satu landmark penting di Sumatera Barat. Selain keunikannya, Jam Gadang memiliki jam mekanik yang sama dengan jam Big Ben di London.",
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
      longDescription: "Istana Siak Sri Indrapura merupakan peninggalan Kerajaan Melayu yang megah dan memiliki arsitektur yang kaya akan pengaruh Eropa, Arab, dan Melayu. Istana ini menyimpan berbagai peninggalan bersejarah dan menjadi museum yang terbuka bagi wisatawan.",
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
      longDescription: "Pantai Trikora di Pulau Bintan terkenal akan keindahan pasir putihnya yang bersih dan air laut yang jernih. Pantai ini menawarkan berbagai aktivitas seperti snorkeling, berenang, dan bersantai sambil menikmati pemandangan laut yang memukau.",
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
      longDescription: "Gunung Kerinci, sebagai gunung tertinggi di Sumatera, menawarkan petualangan mendaki dengan pemandangan alam yang indah. Gunung ini juga merupakan habitat penting bagi berbagai flora dan fauna endemik Sumatera, seperti harimau dan badak Sumatera.",
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
      longDescription: "Jembatan Ampera merupakan landmark ikonik Kota Palembang yang membentang di atas Sungai Musi. Jembatan ini memiliki sejarah panjang sebagai simbol koneksi antara wilayah Ulu dan Ilir, serta pemandangan malam yang memukau.",
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
  }
  // Add more sdestinations here...
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDestinations(destinationsData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <motion.h1 className="text-4xl font-bold text-center mb-8" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          Discover Destination
        </motion.h1>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden rounded-xl border-none">
                <CardContent className="p-0">
                  <div className="relative">
                    <Skeleton className="h-64 w-full" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <Skeleton className="h-6 w-3/4 bg-white/50" />
                      <div className="mt-1 flex items-center space-x-2">
                        <Skeleton className="h-4 w-4 rounded-full bg-white/50" />
                        <Skeleton className="h-4 w-1/2 bg-white/50" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" animate="visible">
            {destinations.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Link href={`/destinations/${item.id}`}>
                  <Card className="group overflow-hidden rounded-xl border-none cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="relative h-64">
                          <Image
                            src={item.destination.imgUrl}
                            alt={item.destination.name}
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                          <h3 className="text-xl font-semibold">{item.destination.name}</h3>
                          <div className="mt-1 flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{item.provinsi}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  )
}