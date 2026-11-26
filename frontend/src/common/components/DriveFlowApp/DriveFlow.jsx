import react, { useState, useEffect } from "react"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import CustomAccordion from "../../CustomAccordion/CustomAccordion"
import CustomTab from "../../CustomTab/CustomTab"
import CustomTable from "../../CustomTable/CustomTable"
import CustomModal from "../../CustomModal/CustomModal"
import CustomButton from "../../CustomButton/CustomButton"
import CustomSelect from "../../CustomSelect/CustomSelect"
import CustomCalendar from "../../CustomCalendar/CustomCalendar"

const Dashboard = () => {
    const [mode, setMode] = useState('admin')
    const [userName, setUserName] = useState()
    const [activeTab, setActiveTab] = useState('Home' || 'Dashboard')
    const [openModal, setOpenModal] = useState(false)

    const DriveFlowFAQs = [
        {
            question: "What is DriveFlow?",
            answer: "DriveFlow makes it easy to explore vehicles and book test drives at your preferred dealerships. Find your next vehicle and experience it before making a purchase decision."
        },
        {
            question: "Can I book test drives for multiple vehicles?",
            answer: "Absolutely! You can explore and book test drives for multiple vehicles, subject to available dealership slots."
        },
        {
            question: "How do I know if my booking is confirmed?",
            answer: "Once your appointment is confirmed by the dealership, your booking status will be updated in your DriveFlow account."
        },
        {
            question: "What if my preferred time slot is unavailable?",
            answer: "You can select another available time slot or contact the dealership to arrange a suitable alternative."
        }
    ];

    const genericFAQs = [
        {
            question: "Is booking a test drive free?",
            answer: "Yes! Booking a test drive through DriveFlow is completely free. You can explore vehicles and schedule appointments without any booking charges."
        },
        {
            question: "How do I book a test drive?",
            answer: "Browse available vehicles, select your preferred model and dealership, choose an available date and time slot, and confirm your booking."
        },
        {
            question: "Can I cancel or reschedule my test drive?",
            answer: "Yes. You can manage your upcoming appointments through your DriveFlow account. Changes are subject to dealership availability and applicable policies."
        },
        {
            question: "Do I need a driving licence?",
            answer: "Yes. You must carry a valid driving licence and meet the dealership's eligibility requirements before taking a test drive."
        },
    ]

    const rowsData = ['A', 'B', 'C', 'D']
    const columnsData = [
        {
            key: 1,
            header: "Date",
            render: () => (
                <>
                    <p>26</p>
                </>
            )
        },
        {
            key: 1,
            header: "Time",
            render: () => (
                <>
                    <p>11:49AM</p>
                </>
            )
        },
        {
            key: 1,
            header: "customer name",
            render: () => (
                <>
                    <p>Larry dummy Smith</p>
                </>
            )
        },
        {
            key: 1,
            header: "contact",
            render: () => (
                <>
                    <p>+10 0934 2039</p>
                </>
            )
        },
        {
            key: 1,
            header: "session time",
            render: () => (
                <>
                    <p>
                        <b>
                            From:
                        </b>
                        11:46AM
                    </p>
                    <p>
                        <b>
                            To:
                        </b>
                        12:30PM
                    </p>

                </>
            )
        },
        {
            key: 1,
            header: " View more",
            render: () => (
                <>
                    <CustomButton onClick={() => setOpenModal(true)} />
                </>
            )
        },

    ]

    const carCardsData = () => {

    }

    const handleEventRegistration = () => {
        return console.log("BUTTON WORKS>>!!!")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            {/* TABS */}
            {mode === 'user'
                ? (
                    <CustomTab
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        TabValues={['Home', 'Cars', 'Tracks', 'FAQs']}
                    />
                ) : mode === "employee"
                    ? (
                        <CustomTab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            //common calendar for both of these roles admin emp. 
                            // normal calendar for user. 
                            TabValues={['Dashboard', 'Assigned Sessions', 'Inventory', 'History']}
                        />
                    ) : (
                        <CustomTab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            TabValues={['Dashboard', 'Sessions', 'Inventory', 'History', 'Management']} // then management will have all the CRUDS, vehicle, Track, Employee. 
                        />
                    )

            }
            {/* TAB CONTENT */}
            {mode === 'user' ? (<main className="flex-1 px-20 py-5">
                {activeTab === 'Home' && <div className="bg-white min-h-[350px] flex flex-col justify-between" >
                    <div className="flex">
                        <h1 className="text-4xl font-bold font-serif">Welcome, </h1>
                        <h1 className="text-4xl text-sky-600 font-bold font-serif">{userName}</h1>
                    </div>
                    <div className="flex">
                        <div className="flex gap-1 w-6/12 flex-col">
                            <div className="flex flex-row my-2 gap-4">
                                <CustomSelect label={"Select Vehicle"} options={['MudRunner 4x4', 'Dilétto GT', 'WorkHorse Ranger', 'Pinto 800']} />
                                <CustomSelect label={"Select Track"} options={['', 'B', 'C']} />
                            </div>
                            <CustomCalendar label={"Schedule Session"} />
                        </div>
                        <div className="flex gap-1 w-6/12 flex-col bg-amber-300 relative">
                            <div className=" w-6/12 bg-red-400">image here both of these to be made as carousels</div>
                            <div className=" w-6/12 bg-blue-400">track here and fade in fade out animation keeps playing.</div>
                            <p className="absolute bottom-0">Preview window.. whatever user selects will be shown here as a preview. finally this is how it should look. This will be info and text section [date : time] [vehicle selected] [track selected] </p>
                        </div>
                    </div>
                    <div className="flex items-end justify-end">
                        <CustomButton purpose="book" onClick={handleEventRegistration} />
                    </div>
                </div>

                }
                {activeTab === 'Cars' && <div className="bg-blue-200 h-[500px]">
                    <h1>Available Cars</h1>
                    <div className="bg-sky-400 h-[350px] w-[350px] rounded-xl bg-sky-200">
                        <h1 className="text-white p-3"> x4 </h1>
                    </div>
                    {/* NOW FETCH CARS DETAILS FROM BACKEND AND MAP IT TO 4 CARDS */}
                </div>}
                {activeTab === 'Tracks' && <div className="bg-slate-200 h-[500px]">
                    <h1>Available Tracks showcase</h1>
                    <div className="bg-sky-400 h-[350px] w-[350px] rounded-xl bg-sky-200">
                        <h1 className="text-white p-3"> x4 </h1>
                    </div>
                    {/* NOW FETCH TRACK DETAILS FROM BACKEND AND MAP IT TO 4 CARDS */}
                </div>}
                {activeTab === 'FAQs' && <div className="bg-slate-50 h-[500px] pt-10">
                    <h1 className="text-4xl text-center font-bold">
                        Frequently Asked Questions
                    </h1>
                    <div className="px-10 py-10  flex flex-row gap-10">
                        <CustomAccordion items={DriveFlowFAQs} />
                        <CustomAccordion items={genericFAQs} />
                    </div>
                </div>}
            </main>) : mode === 'employee' ? (<section className="flex-1">
                {/* employee dashboard +++++###################+++++++++++#------------------------------------------------------------------------------------=================================================================================================================================== */}
                <div className="py-4 px-8 h-full flex flex-col">
                    {activeTab === 'Dashboard' && <div className="flex flex-col gap-4">
                        <div className="flex gap-3 justify-between">
                            <div className="w-6/12 flex justify-center">
                                <CustomCalendar />
                            </div>
                            <div className="w-6/12 flex flex-col justify-around py-5 bg-slate-50">
                                <div className="flex justify-around h-4/12 bg-amber-100">
                                    <div> my sessions </div>
                                    <div> attendace this week</div>
                                    <div>scheduled sessions</div>
                                </div>
                                <div className="flex justify-around h-4/12 bg-amber-800">
                                    <CustomButton purpose="custom" /> {/*  */}
                                    <CustomButton purpose="view more" />
                                    <CustomButton purpose="book" />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {activeTab === 'Assigned Sessions' && <div className="flex flex-col gap-4">
                        <div>
                            inventory. show the available cars and tracks.
                            <ul>
                                <ol>
                                    Admin is integrated in the workflow
                                </ol>
                                <ol>
                                    Employee doesnt need to have this functionality
                                </ol>
                                and finally we can then add the scheduled sessions with inapp notification? like you havebeen assigned a session. so thats another big thing we can add notifications.
                            </ul>
                        </div>
                    </div>}

                    {activeTab === 'Inventory' && <div className="flex h-full bg-blue-50 flex-col gap-4">
                        <div>
                            inventory. show the available cars and tracks.
                            all in 1 show
                            <div className="flex w-full gap-2">
                                <div className="bg-amber-200 h-half w-3/12">car 1</div>
                                <div className="bg-amber-200 h-half w-3/12">car 2</div>
                                <div className="bg-amber-200 h-half w-3/12">car 3</div>
                                <div className="bg-amber-200 h-half w-3/12">car 4</div>
                            </div>
                            <div className="flex w-full gap-2">
                                <div className="bg-red-200 h-half w-3/12">track 1</div>
                                <div className="bg-red-200 h-half w-3/12">track 2</div>
                                <div className="bg-red-200 h-half w-3/12">track 3</div>
                                <div className="bg-red-200 h-half w-3/12">track 4</div>
                            </div>
                        </div>
                    </div>}
                    {activeTab === 'History' && <div className="flex flex-col gap-4 p-5">
                        show employee's session history table.
                        date | Time | customer name | contact |session time| View more opens modal with details
                        <CustomTable rows={rowsData} columns={columnsData} />
                        <CustomModal
                            isOpen={openModal}
                            onClose={() => setOpenModal(false)}
                            title="Session details"
                        />
                    </div>}

                </div>
            </section>) : (<section className="flex-1">
                {/* Admin Dashboard +++++###################+++++++++++#------------------------------------------------------------------------------------=================================================================================================================================== */}
                <div className="py-4 px-8">
                    {
                        activeTab === "Dashboard" && <div className="flex gap-2 p-5">
                            <div className="flex w-8/12">
                                stats
                                <div>
                                    todays sessions
                                </div>
                                <div>
                                    total sessions this month
                                </div>
                                <div>
                                    Revenue and payment summary
                                </div>
                                <div>
                                    Vehicle maintenance alerts
                                </div>
                                <div>
                                    Recent bookings / cancellations
                                </div>
                            </div>
                            <div className="w-4/12">
                                <CustomCalendar />
                            </div>
                        </div>
                    }
                    {
                        activeTab === 'Sessions' && <div>
                            sessions table dashboard of all the sessions completed, maybe a piechart of completed scheduled and refunded show active reschedules
                        </div>
                    }
                    {
                        activeTab === "Inventory" && <div className="flex w-full">
                            <div>
                                car tracking table ||
                                employee attendace table
                            </div>
                        </div>
                    }
                    {activeTab === 'History' && <div className="flex flex-col gap-4 p-5">
                        show all employee's session history table.
                        date | Time | customer name | contact |session time| View more opens modal with details
                        <CustomTable rows={rowsData} columns={columnsData} />
                        <CustomModal
                            isOpen={openModal}
                            onClose={() => setOpenModal(false)}
                            title="Session details"
                        />
                    </div>}
                    {
                        activeTab === "Management" && <div>
                            finance management, employee management, calendar and customer history,
                            vehicle management, track maintainance schedule, calendar full view live details, options to add delete reschedule.
                        </div>
                    }
                </div>
            </section>)
            }
            <Footer />
        </div>
    )
}

export default Dashboard