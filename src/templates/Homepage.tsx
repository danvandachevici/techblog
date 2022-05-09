// import IndexNavbar from '@components/Navbars/IndexNavbar';
// import DescriptionSection from '@sections/DescriptionSection/DescriptionSection';
// import HeroSection from '@sections/HeroSection/HeroSection';
// import ServicesOverviewSection from '@sections/ServicesOverviewSection/ServicesOverviewSection';
import Head from 'next/head';

export default function Homepage({data}: any) {
  return (
    <>
      <Head>
        <title>{data.metaTitle}</title>
        <meta name="robots" content={`${data.follow && 'follow'} ${data.index && 'index'}`} />
      </Head>
      {/* <IndexNavbar fixed /> */}
      <div className='w-full justify-center'>
        Welcome home
        {/* <HeroSection></HeroSection> */}
        {/* <DescriptionSection></DescriptionSection> */}
        {/* <ServicesOverviewSection></ServicesOverviewSection> */}
      </div>
    </>
  );
}