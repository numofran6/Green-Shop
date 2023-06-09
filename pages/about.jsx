import { AboutCard } from '../components/AboutCard';
import Layout from '../components/Layout';
import chung from '../public/images/chung.png';
import ishaan from '../public/images/ishaan.png';
import john from '../public/images/john.png';
import paige from '../public/images/paige.png';
import { motion } from 'framer-motion';

function About() {
	return (
		<>
			<Layout title={'About'}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="flex flex-col justify-center items-center my-14 md:my-20 space-y-14"
				>
					<div className="flex px-2 flex-col items-center space-y-3">
						<h1 className="text-green-700 font-bold">Our team</h1>

						<h1 className="font-bold text-2xl md:text-3xl max-w-sm text-center">
							Meet The Minds Shaping An Industry
						</h1>

						<h2 className="font-medium px-2">
							Our goal is to bridge the gap between local fashion designers in
							Ghana and their potential customers.
						</h2>
					</div>

					<div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-24 space-y-10 md:space-y-0">
						<AboutCard name={'Kofi Grant'} img={john} role="Founder" />
						<AboutCard name={'Akua Rose'} img={chung} role="Co-Founder" />
						<AboutCard name={'Yaw Yofi'} img={ishaan} role="CTO" />
						<AboutCard name={'Ama Foriwaa'} img={paige} role="COO" />
					</div>
				</motion.div>
			</Layout>
		</>
	);
}

export default About;
