'use client';
import { FC } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../styles/swiper-custom.css';
import { Pagination, Navigation } from 'swiper/modules';
import { teamMembers } from '@/data';
const AboutTeamCarousel: FC = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      style={{ width: '100%', height: 'auto' }}
    >
      {teamMembers.map((member) => (
        <SwiperSlide key={member.name}>
          <div className="team-member-card bg-white shadow-lg rounded-lg max-w[35vw] overflow-hidden p-4">
            <div className="relative h-48 w-[60] mb-4">
              <Image
                src={member.imageSrc}
                alt={member.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <p className="text-gray-600">{member.bio}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AboutTeamCarousel;
