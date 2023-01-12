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
					</div>

					<div className="flex flex-col md:flex-row md:space-x-8 lg:space-x-24 space-y-10 md:space-y-0">
						<AboutCard name={'John Doe'} img={john} />
						<AboutCard name={'Rose Bud'} img={chung} />
						<AboutCard name={'Ishaan Navi'} img={ishaan} />
						<AboutCard name={'Paige Anna'} img={paige} />
					</div>
				</motion.div>
			</Layout>
		</>
	);
}

export default About;
