import { AboutCard } from '../components/AboutCard';
import Layout from '../components/Layout';
import chung from '../public/images/chung.png';
import ishaan from '../public/images/ishaan.png';
import john from '../public/images/john.png';
import paige from '../public/images/paige.png';

function About() {
	return (
		<>
			<Layout title={'About'}>
				<div className="flex flex-col justify-center items-center my-14 md:my-20 space-y-14">
					<div className="flex flex-col items-center space-y-3">
						<h1 className="text-green-700 font-bold">Our team</h1>

						<h1 className="font-bold text-2xl md:text-3xl max-w-sm text-center">
							Meet The Minds Shaping An Industry
						</h1>
					</div>

					<div className="flex flex-col md:flex-row md:space-x-24 space-y-10 md:space-y-0">
						<AboutCard name={'John Doe'} img={john} />
						<AboutCard name={'Rose Bud'} img={chung} />
						<AboutCard name={'Ishaan Navi'} img={ishaan} />
						<AboutCard name={'Paige Anna'} img={paige} />
					</div>
				</div>
			</Layout>
		</>
	);
}

export default About;
