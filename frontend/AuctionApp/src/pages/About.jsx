import React from 'react';

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-1">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About BestBid</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to BestBid, the ultimate destination for online auctions! We offer a platform where buyers and sellers
          can engage in exciting bidding wars, ensuring the best deals for everyone involved.
        </p>
      </div>

      <div className="mt-10 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-600">
          Our mission is to provide a secure, reliable, and user-friendly environment for online auctioning. We aim to bring
          people together to participate in thrilling auctions while maintaining transparency and fairness throughout.
        </p>
      </div>

      <div className="mt-16 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">What We Offer</h2>
        <ul className="mt-4 text-lg text-gray-600 list-disc list-inside">
          <li>Wide range of auction categories (electronics, fashion, collectibles, etc.)</li>
          <li>Real-time bidding updates and notifications</li>
          <li>Secure payment system for buyers and sellers</li>
          <li>Detailed product listings and transparent auction process</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
