'use client';

import CardField from '@/components/card/CardField';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/utils/swiper.css';
import { Navigation, Pagination } from 'swiper/modules';
import { fieldData } from '@/utils/homeContent';

const GroupField = () => {
    return (
        <>
            <div className="md:hidden">
                <Swiper
                    className="w-[310px]"
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                >
                    {fieldData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CardField
                                title={item.title}
                                subTitle={item.subTitle}
                                description={item.description}
                                imgSrc={item.imgSrc}
                                hoverSrc={item.hoverSrc}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden md:grid grid-cols-3 lg:gap-7 gap-5">
                {fieldData.map((item, index) => (
                    <CardField
                        key={index}
                        title={item.title}
                        subTitle={item.subTitle}
                        description={item.description}
                        imgSrc={item.imgSrc}
                        hoverSrc={item.hoverSrc}
                    />
                ))}
            </div>
        </>
    );
};

export default GroupField;
