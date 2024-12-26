const Footer = () => {
    return (
        <>
            <footer className="bg-primary py-4">
                <div className="text-center text-sm text-white">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Footer;