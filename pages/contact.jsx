import Layout from '../components/Layout';
import { BsTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';

function Contact() {
	return (
		<>
			<Layout title={'Contact'}>
				<div className="lg:grid grid-cols-2 gap-5 space-y-16 lg:space-y-0 px-10 my-20 lg:my-40 justify-center flex flex-col items-center">
					<div className="lg:ml-20 space-y-10 lg:space-y-14">
						<h1 className="text-4xl lg:text-5xl font-bold max-w-sm text-gray-800">
							Got A Project or A Partnership in Mind?
						</h1>

						<div className="flex items-center justify-between max-w-md">
							<div className="space-y-2">
								<div className="bg-stone-200 w-fit p-5">
									<BsTelephoneFill className="text-emerald-700 h-6 w-6" />
								</div>
								<h1 className="font-bold text-lg">Phone:</h1>
								<p>+233 {'(0)'} 50 238 5080</p>
							</div>

							<div className="space-y-2">
								<div className="bg-stone-200 w-fit p-5">
									<GrMail className="text-emerald-700  h-6 w-6" />
								</div>
								<h1 className="font-bold text-lg">Email:</h1>
								<p>numfran6@gmail.com</p>
							</div>
						</div>
					</div>

					<div className="md:mr-20 space-y-5 max-w-xs lg:max-w-none">
						<form className="space-y-5 ">
							<div className="flex flex-col xl:flex-row items-center space-y-5 xl:space-y-0 xl:space-x-5">
								<input
									type="text"
									placeholder="Enter Your Name"
									className="w-full bg-white border-b-2 border-gray-400"
								/>
								<input
									type="text"
									placeholder="Your Phone Number"
									className="w-full bg-white  border-b-2 border-gray-400"
								/>
							</div>

							<input
								type="email"
								placeholder="Your E-mail"
								className="w-full bg-white  border-b-2 border-gray-400"
							/>
							<input
								type="text"
								placeholder="Leave a Message"
								className="w-full bg-white  border-b-2 border-gray-400"
							/>
						</form>

						<div className="flex items-center justify-end">
							<button type="button" className="newprimarybtn">
								Send A Message
							</button>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}

export default Contact;
