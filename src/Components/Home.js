import { AutoComplete, Divider } from "antd"
import React from "react"
import { getbootcamp, getuserhomepage } from "../apiCalls"
import Campdetails from "./Elements/campdetails"
import Header from "./Elements/Header"



const Home = () => {

    const [login] = React.useState(!!sessionStorage.getItem("email"))
    const [camplist, setcamplist] = React.useState()
    const [completebootcamplist, setcompletebootcamplist] = React.useState()

    const [namelist, getnamelist] = React.useState([])
    const [registeredcamp, setregisteredcamp] = React.useState([])
    const [nonregisteredcamp, setnonregisteredcamp] = React.useState([])


    React.useEffect(() => {
        if (login) {
            getuserhomepage({ id: sessionStorage.getItem("userid") }).then((res) => {

                document.title = sessionStorage.getItem("name")

                setcompletebootcamplist([...res.bootlist])

                const registedbootcampid = new Set([...res.registeredbootcamp[0].userlists.map(ele => ele.bootcampid)])
                document.title = sessionStorage.getItem("name")

                //filter non-register camp
                setnonregisteredcamp(res.bootlist.map(ele => {
                    if (!registedbootcampid.has(ele._id))
                        return ele
                }).filter(Boolean))

                //filter registercamp
                setregisteredcamp(res.bootlist.map(ele => {
                    if (registedbootcampid.has(ele._id))
                        return ele
                }).filter(Boolean))
            })
        }
        else {
            getbootcamp().then((res) => {
                setcamplist(res.bootlist)
                document.title = "Home"
                setcompletebootcamplist([...res.bootlist])



            })
        }

    }, [login])



    const onsearch = (data) => {
        console.log(data);
        login ?
            getnamelist(
                !data ? [] : nonregisteredcamp.filter(ele => !ele.name.toLowerCase().indexOf(data.toLowerCase())),
            )
            :
            getnamelist(
                !data ? [] : completebootcamplist.filter(ele => !ele.name.toLowerCase().indexOf(data.toLowerCase())),
            );
    }

    console.log(namelist);
    const dividerstyle = { color: "#800000", fontSize: "2em" }

    return (
        <React.Fragment>
            <Header active="home" />
            <main>
                <section className="search">
                    <AutoComplete
                        className="autocomplete"
                        // options={namelist}
                        // onSelect={onSelect}
                        onSearch={onsearch}
                        placeholder="Search by Name"
                    />
                </section>
                <br />
                <section className={login ? null : "camplist"}>
                    {
                        namelist.length !== 0 ?
                            <div className="camplist">
                                {namelist.map(ele => <Campdetails data={ele} key={ele.bootcampid} />)}
                            </div>
                            :

                            login ?
                                <React.Fragment>
                                    <Divider orientation="left" style={dividerstyle} >Registered</Divider>
                                    <br />
                                    <div className="camplist">
                                        {
                                            registeredcamp?.length !== 0 ?
                                                registeredcamp.map(ele => <Campdetails isregistered={true} data={ele} key={ele.bootcampid} />)
                                                :
                                                <h1 className="emptyvalue">Give an Try!</h1>



                                        }</div>
                                    <br />
                                    <Divider orientation="left" style={dividerstyle} >Not Registered</Divider>
                                    <br />
                                    <div className="camplist">
                                        {
                                            nonregisteredcamp?.length !== 0 ?
                                                nonregisteredcamp.map(ele => <Campdetails isregistered={false} data={ele} key={ele.bootcampid} />)
                                                :
                                                <h1 className="emptyvalue">Wow!Keep it Up</h1>


                                        }</div>
                                    <br />
                                </React.Fragment>
                                :
                                camplist?.map(ele => <Campdetails isregistered={false} data={ele} key={ele.bootcampid} />)

                    }

                </section>
            </main>
        </React.Fragment>
    )
}

export default Home