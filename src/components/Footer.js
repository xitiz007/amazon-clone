import styled from "styled-components";

function Footer() {
  return (
    <footer className="bg-amazon_blue-Navbar p-10">
      <Bottom className="text-gray-50 text-sm mb-2">
        Developed by
        <a
          href="https://www.baniyakshitiz.com.np/"
          target="_blank"
          className="mx-2 cursor-pointer hover:text-white"
        >
          Kshitiz Baniya
        </a>
      </Bottom>
      <Bottom className="flex space-x-5 text-gray-100 text-xs">
        <div className="hover:text-gray-50 cursor-pointer">
          Conditions of Use
        </div>
        <div className="hover:text-gray-50 cursor-pointer">Provacy Notice</div>
        <div className="hover:text-gray-50 cursor-pointer">
          Interest-Based Ads
        </div>
        <div className="hover:text-gray-50 cursor-pointer">
          © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
        </div>
      </Bottom>
    </footer>
  );
}

export default Footer;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
