import Layout from "../Layout"


type Props = {

}

const About = (props: Props) => {
    return (
        <Layout>
            <div>About Page</div>
            <div className="fixed inset-0 cursor-pointer bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
                modal
            </div>
        </Layout>

    )
}

export default About