import React from 'react';
import { CardBody, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import config from 'config/index.json';

const { IMAGES_URL } = config;

interface Props {
  post: any;
}

const Body: React.FC<Props> = ({ post }): JSX.Element => {
  return (
    <CardBody sx={{ zIndex: '0' }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
        }}
        navigation={true}
        pagination={true}
        spaceBetween={50}
        slidesPerView={1}
      >
        {post?.media.map((media: any) => {
          return media.source.slice(-3) === 'mp4' ? (
            <SwiperSlide key={media._id}>
              <video src={IMAGES_URL + media.source} controls />
            </SwiperSlide>
          ) : (
            <SwiperSlide key={media._id}>
              <Image src={IMAGES_URL + media.source} sx={{ zIndex: '2' }} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <Image src={faker.image.image()} alt={faker.name.fullName()} borderRadius="sm" loading="lazy" /> */}
      <VStack>
        <Text noOfLines={2} fontSize="md" w="90%">
          {post?.description}
        </Text>
      </VStack>
    </CardBody>
  );
};

export default Body;
