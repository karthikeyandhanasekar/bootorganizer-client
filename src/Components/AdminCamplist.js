import { AutoComplete } from "antd"
import React from "react"
import { admingetbootcamp } from "../apiCalls"
import Campdetails from "./Elements/campdetails"
import Header from "./Elements/Header"



const AdminCamplist = () => {
    const [camplist, setcamplist] = React.useState()
    const [namelist, getnamelist] = React.useState([])

    React.useEffect(() => {
        admingetbootcamp({ id: 0 }).then((res) => {
            console.log(res.bootlist);
            setcamplist(res.bootlist)
        })
            .catch(err =>
                console.log(err.message))
    }, [])
    document.title = "Admin"
    console.log(camplist);

    const onsearch = (data) => {
        console.log(data);
        getnamelist(
            !data ? [] : camplist.filter(ele => !ele.name.toLowerCase().indexOf(data.toLowerCase())),
        );
    }
    return (
        <React.Fragment>
            <Header active={"home"} />
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
                <section className={"camplist"}>
                    {
                        namelist.length !== 0 ?
                            namelist.map(ele => <Campdetails data={ele} key={ele.bootcampid} />)
                            :
                            camplist?.map(ele => <Campdetails isregistered={false} data={ele} key={ele.bootcampid} />)

                    }

                </section>
            </main>
        </React.Fragment>
    )
}

export default AdminCamplist