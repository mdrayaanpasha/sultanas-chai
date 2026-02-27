import SultanasHero from "./components/cover"
import SultanasLocation from "./components/info"
import SultanasFeatured from "./components/specials"
import SultanasAbout from "./components/story"
import SultanasFooter from "../../components/footer"

export default function Home() {
    return (
        <>

        <SultanasHero />
        <SultanasAbout />
        <SultanasFeatured />
        <SultanasLocation />
        <SultanasFooter />
        </>
    )
}