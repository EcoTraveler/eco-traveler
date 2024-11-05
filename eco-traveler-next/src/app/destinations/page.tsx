"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Destination {
  provinsi: string;
  destination: {
    name: string;
    description: string;
    imgUrl: string;
  };
}

const destinationsData: Destination[] = [
  {
    provinsi: "Aceh",
    destination: {
      name: "Masjid Raya Baiturrahman",
      description: "Masjid bersejarah yang menjadi ikon Kota Banda Aceh.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg",
    },
  },
  {
    provinsi: "Sumatera Utara",
    destination: {
      name: "Danau Toba",
      description: "Danau vulkanik terbesar di Indonesia dengan Pulau Samosir di tengahnya.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Indonesia_-_Lake_Toba_%2826224127503%29.jpg",
    },
  },
  {
    provinsi: "Sumatera Barat",
    destination: {
      name: "Jam Gadang",
      description: "Menara jam besar yang menjadi ikon kota Bukittinggi.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Jam_Gadang_memanjang.jpg/1200px-Jam_Gadang_memanjang.jpg",
    },
  },
  {
    provinsi: "Riau",
    destination: {
      name: "Istana Siak",
      description: "Istana peninggalan kerajaan Melayu di Kota Siak.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Istana_Kerajaan_Siak_%283%29.jpg",
    },
  },
  {
    provinsi: "Kepulauan Riau",
    destination: {
      name: "Pantai Trikora",
      description: "Pantai cantik di Pulau Bintan dengan pasir putih dan air jernih.",
      imgUrl: "https://atourin.obs.ap-southeast-3.myhuaweicloud.com/images/destination/bintan/pantai-trikora-profile1695024664.jpeg?x-image-process=image/resize,p_100,limit_1/imageslim",
    },
  },
  {
    provinsi: "Jambi",
    destination: {
      name: "Gunung Kerinci",
      description: "Gunung tertinggi di Sumatera yang populer untuk pendakian.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Uprising-mount_kerinci.jpg",
    },
  },
  {
    provinsi: "Sumatera Selatan",
    destination: {
      name: "Jembatan Ampera",
      description: "Jembatan yang menjadi ikon Kota Palembang.",
      imgUrl: "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1701852720-42dc2d82-a28e-4c71-9031-24f601893bf1-40730-0000049d09df54ae-jpg-medium.jpg",
    },
  },
  {
    provinsi: "Bengkulu",
    destination: {
      name: "Benteng Marlborough",
      description: "Benteng peninggalan Inggris yang bersejarah di Bengkulu.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgmThHexRpwT1D5bi4ho7rGmkYqr8QTlwnrA&s",
    },
  },
  {
    provinsi: "Lampung",
    destination: {
      name: "Taman Nasional Way Kambas",
      description: "Habitat bagi gajah Sumatera yang dilindungi.",
      imgUrl: "https://asset.kompas.com/crops/Zth1oN7cO0wTZGrIPSnoAymoiUE=/0x0:0x0/1200x800/data/photo/2021/01/05/5ff421715559d.jpeg",
    },
  },
  {
    provinsi: "Bangka Belitung",
    destination: {
      name: "Pantai Tanjung Tinggi",
      description: "Pantai dengan batuan granit besar yang unik.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Lq9yc4mMTPWx9EmXauc28cSxcHcZnSViNQ&s",
    },
  },
  {
    provinsi: "Kalimantan Tengah",
    destination: {
      name: "Taman Nasional Tanjung Puting",
      description: "Habitat alami orangutan Kalimantan yang dilindungi.",
      imgUrl: "https://web.visitkotawaringinbarat.id/wp-content/uploads/2021/01/Kelotok_Wisata.jpg",
    },
  },
  {
    provinsi: "Kalimantan Selatan",
    destination: {
      name: "Pasar Terapung Lok Baintan",
      description: "Pasar tradisional di atas perahu di Sungai Martapura.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJZmf7nL-BsgxgOxhtTayZKaHcCuDD5iKzA&s",
    },
  },
  {
    provinsi: "Kalimantan Timur",
    destination: {
      name: "Pulau Derawan",
      description: "Pulau dengan keindahan bawah laut yang memukau.",
      imgUrl: "https://jadesta.kemenparekraf.go.id/imgpost/62567.jpg",
    },
  },
  {
    provinsi: "Kalimantan Utara",
    destination: {
      name: "Taman Nasional Kayan Mentarang",
      description: "Taman nasional yang melestarikan hutan hujan tropis Kalimantan.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9QMjE1xh177XwffcAPNrcLbA5Ut_Sroop5Q&s",
    },
  },
  {
    provinsi: "Banten",
    destination: {
      name: "Pantai Anyer",
      description: "Pantai populer dekat Jakarta dengan pemandangan indah ke Gunung Krakatau.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7YB1uXm9NX3bMyqtBu1gi1M-EGdyEUFndg&s",
    },
  },
  {
    provinsi: "Jawa Barat",
    destination: {
      name: "Kawah Putih",
      description: "Danau kawah dengan air berwarna putih kehijauan di Ciwidey.",
      imgUrl: "https://dirgantaracarrental.com/wp-content/uploads/2017/01/Paket-Wisata-Kawah-Putih-Ciwidey1.jpg",
    },
  },
  {
    provinsi: "Jawa Tengah",
    destination: {
      name: "Candi Borobudur",
      description: "Candi Buddha terbesar di dunia yang termasuk situs Warisan Dunia UNESCO.",
      imgUrl: "https://www.indonesia.travel/content/dam/indtravelrevamp/en/destinations/revision-2019/4.jpg",
    },
  },
  {
    provinsi: "DI Yogyakarta",
    destination: {
      name: "Malioboro",
      description: "Jalan terkenal untuk berbelanja dan mencicipi kuliner khas Yogyakarta.",
      imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Malioboro_Street%2C_Yogyakarta.JPG/1200px-Malioboro_Street%2C_Yogyakarta.JPG",
    },
  },
  {
    provinsi: "Jawa Timur",
    destination: {
      name: "Gunung Bromo",
      description: "Gunung berapi aktif dengan pemandangan sunrise yang memukau.",
      imgUrl: "https://www.pesonaindo.com/wp-content/uploads/2016/04/bromo.jpg",
    },
  },
  {
    provinsi: "Bali",
    destination: {
      name: "Pantai Kuta",
      description: "Pantai dengan ombak yang cocok untuk berselancar dan matahari terbenam yang indah.",
      imgUrl: "https://cinchy.life/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fpj3idduy0ni9%2F2BsaLfhco58uafWL3eDtDf%2F5aa74e43e3a26a0da9fa8cf78ca4f0a7%2Fwisata-pantai-kuta-bali.jpg&w=3840&q=75",
    },
  },
  {
    provinsi: "Nusa Tenggara Barat",
    destination: {
      name: "Gunung Rinjani",
      description: "Gunung tertinggi kedua di Indonesia dengan pemandangan indah.",
      imgUrl: "https://torch.id/cdn/shop/articles/1706999589_Preview_12782da7-0e30-4f27-a52d-142ad405ef12.jpg?v=1706999596&width=1100",
    },
  },
  {
    provinsi: "Nusa Tenggara Timur",
    destination: {
      name: "Taman Nasional Komodo",
      description: "Habitat komodo dan pemandangan pantai serta laut yang indah.",
      imgUrl: "https://asset.kompas.com/crops/vdZhnhd65omILwbPWGk6C_Vdsp0=/0x0:780x520/1200x800/data/photo/2019/09/26/5d8c64544d656.jpg",
    },
  },
  {
    provinsi: "Sulawesi Utara",
    destination: {
      name: "Taman Laut Bunaken",
      description: "Taman laut dengan keanekaragaman biota laut yang luar biasa.",
      imgUrl: "https://ik.imagekit.io/tvlk/blog/2020/01/keindahan-alam-indonesia-5-Super-Adventure.jpg?tr=dpr-2,w-675",
    },
  },
  {
    provinsi: "Sulawesi Tengah",
    destination: {
      name: "Togean Islands",
      description: "Kepulauan dengan pantai pasir putih dan spot snorkeling.",
      imgUrl: "https://pinkplankton.com/wp-content/uploads/2020/04/togean-islands-fadhila-cottages-2.jpg",
    },
  },
  {
    provinsi: "Sulawesi Selatan",
    destination: {
      name: "Tana Toraja",
      description: "Daerah wisata budaya dengan tradisi pemakaman unik.",
      imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxDcUHPW5hWIAfiKB6xDm0zeI8daJZEzyEg&s",
    },
  },
  {
    provinsi: "Sulawesi Tenggara",
    destination: {
      name: "Wakatobi",
      description: "Destinasi menyelam terkenal dengan terumbu karang yang mempesona.",
      imgUrl: "https://www.indonesia.travel/content/dam/indtravelrevamp/id-id/ide-liburan/image-artikel-7-hal-tentang-wakatobi-yang-wajib-kamu-tahu-5.png",
    },
  },
  {
    provinsi: "Gorontalo",
    destination: {
      name: "Pulau Saronde",
      description: "Pulau kecil dengan pantai pasir putih dan keindahan alam.",
      imgUrl: "https://img.okezone.com/content/2021/04/20/406/2397482/pengunjung-pulau-saronde-dominan-warga-lokal-selama-pandemi-vjY7810zeI.JPG",
    },
  },
  {
    provinsi: "Maluku",
    destination: {
      name: "Pantai Ora",
      description: "Pantai dengan air jernih dan kehidupan laut yang mempesona.",
      imgUrl: "https://cdn.wisata.app/diary/ded32177-a0a8-44ec-850b-1d20e71a6839.jpg",
    },
  },
  {
    provinsi: "Maluku Utara",
    destination: {
      name: "Pulau Morotai",
      description: "Pulau dengan sejarah Perang Dunia II dan pantai eksotis.",
      imgUrl: "https://wonderful.pulaumorotaikab.go.id/gambar/aktifitas/aktifitas-mengayuh-perahu-di-birunya-laut-morotai-4-l.jpg",
    },
  },
  {
    provinsi: "Papua Barat",
    destination: {
      name: "Raja Ampat",
      description: "Kepulauan dengan keindahan bawah laut yang mempesona.",
      imgUrl: "https://res.cloudinary.com/zublu/image/fetch/f_webp,w_1200,q_auto/https://www.zubludiving.com/images/Indonesia/West-Papua/Raja-Ampat/Raja-Ampat-Wayag-Diving.jpg",
    },
  },
  {
    provinsi: "Papua",
    destination: {
      name: "Danau Sentani",
      description: "Danau luas yang terkenal dengan pemandangan dan festival budaya.",
      imgUrl: "https://cdn.idntimes.com/content-images/post/20191008/2-06d20df9484233c2ab6414a410ed7104.jpg",
    },
  },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setDestinations(destinationsData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

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
            {destinations.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group overflow-hidden rounded-xl border-none">
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  );
}
