import {React} from "./Import";

const inlineStyle = {
    "backgroundImage":"url(assets/img/hero-bg.png)",
    "backgroundPosition":"top right",
    "backgroundSize":"contain"
}
function SecondFold()
{
    return (
        <section className="py-0 bg-light-gradient">
            <div className="bg-holder" style={inlineStyle}>
            </div>

            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-5 order-md-1 pt-8"><img className="img-fluid" src="assets/img/hero.png" alt=""/></div>
                <div className="col-md-7 col-lg-6 text-center text-md-start pt-5 pt-md-9">
                <h1 className="display-2 fw-bold fs-4 fs-md-5 fs-xl-6">Building exactly the <br/>eCommerce website you want.</h1>
                <p className="mt-3 mb-4">WooCommerce is a customizable, open-source eCommerce platform built on WordPress.Get started quickly and make your way.</p>
                </div>
            </div>
            </div>
        </section>
    );
}
export default SecondFold;