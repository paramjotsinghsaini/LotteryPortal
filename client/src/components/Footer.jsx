import {React} from "./Import";

function Footer()
{
    return (
    <section className="py-7">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-lg-3">
                    <h4 className="text-primary font-weight-bold">Bridge</h4>
                    <p className="mb-2 text-muted">Where design connects <br /> with excellence.</p>
                    <ul className="list-unstyled list-inline mb-6 mb-md-0">
                        <li className="list-inline-item mr-2"><a className="text-decoration-none" href="#!"><img
                                    className="list-social-icon" src="assets/img/gallery/facebook.svg" alt=""
                                    width="25" /></a></li>
                        <li className="list-inline-item mr-2"><a className="text-decoration-none" href="#!"><img
                                    className="list-social-icon" src="assets/img/gallery/linkedin.svg" alt=""
                                    width="25" /></a></li>
                        <li className="list-inline-item mr-2"><a className="text-decoration-none" href="#!"><img
                                    className="list-social-icon" src="assets/img/gallery/instagram.svg" alt=""
                                    width="25" /></a></li>
                        <li className="list-inline-item"><a className="text-decoration-none" href="#!"><img
                                    className="list-social-icon" src="assets/img/gallery/github.svg" alt=""
                                    width="25" /></a></li>
                    </ul>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                    <h6 className="footer-title">Products</h6>
                    <ul className="list-unstyled mb-6 mb-md-4 mb-lg-0">
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Page Builder</a>
                        </li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">UI Kit</a></li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Styleguide</a></li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Documentation</a>
                        </li>
                        <li><a className="text-500 text-decoration-none" href="#!">Changelog</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                    <h6 className="footer-title">Services</h6>
                    <ul className="list-unstyled mb-6 mb-md-4 mb-lg-0">
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Documentation</a>
                        </li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Changelog</a></li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Pagebuilder</a></li>
                        <li><a className="text-500 text-decoration-none" href="#!">UI Kit</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">
                    <h6 className="footer-title">Connect</h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Page Builder</a>
                        </li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">UI Kit</a></li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Styleguide</a></li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Documentation</a>
                        </li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Changelog</a></li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Documentation</a>
                        </li>
                    </ul>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                    <h6 className="footer-title">Legal</h6>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Documentation</a>
                        </li>
                        <li className="mb-2 mb-lg-2"><a className="text-500 text-decoration-none" href="#!">Changelog</a></li>
                        <li><a className="text-500 text-decoration-none" href="#!">Pagebuilder </a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Footer;