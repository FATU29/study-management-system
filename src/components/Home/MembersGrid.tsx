import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Member.tsx.css'

const MembersGrid = () => {
    return (
        <>
            <div className="row justify-content-center font-bold fs-1 my-4 text-primary">
                Thành viên
            </div>
            <div className="row row-auto justify-content-center mb-4">
                <div className="col col-auto">
                    <div className="card w-[340px] mx-auto text-center border-2 rounded-lg bg-white py-6 px-3 shadow-sm">
                    <img className="w-32 block mx-auto mb-4" src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-1.png`} alt="Profile Avatar" />
                    <h2 className="text-lg  font-semibold">Minh Trực</h2>
                    <h1 className="text-gray-500 text-xs mb-2">Software Engineer
                        <span className="text-gray-500 ml-1 sub-title">@ uStudy</span>
                    </h1>
                    <button className="bg-primary text-white py-2 px-4 rounded-lg">
                        Theo dõi tôi
                    </button>
                    </div>
                </div>
                <div className="col col-auto">
                    <div className="card w-[340px] mx-auto text-center border-2 rounded-lg bg-white py-6 px-3 shadow-sm">
                    <img className="w-32 block mx-auto mb-4" src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-3.png`} alt="Profile Avatar" />
                    <h2 className="text-lg  font-semibold">Tấn Phát</h2>
                    <h1 className="text-gray-500 text-xs mb-2">Software Engineer
                        <span className="text-gray-500 ml-1 sub-title">@ uStudy</span>
                    </h1>
                    <button className="bg-primary text-white py-2 px-4 rounded-lg">
                        Theo dõi tôi
                    </button>
                    </div>
                </div>
                <div className="col col-auto">
                    <div className="card w-[340px] mx-auto text-center border-2 rounded-lg bg-white py-6 px-3 shadow-sm">
                    <img className="w-32 block mx-auto mb-4" src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-4.png`} alt="Profile Avatar" />
                    <h2 className="text-lg  font-semibold">Minh Trí</h2>
                    <h1 className="text-gray-500 text-xs mb-2">Game Developer
                        <span className="text-gray-500 ml-1 sub-title">@ uStudy</span>
                    </h1>
                    <button className="bg-primary text-white py-2 px-4 rounded-lg">
                        Theo dõi tôi
                    </button>
                    </div>
                </div>
            </div>
            <div className="row row-auto justify-content-center mb-4">
            <div className="col col-auto">
                    <div className="card w-[340px] mx-auto text-center border-2 rounded-lg bg-white py-6 px-3 shadow-sm">
                    <img className="w-32 block mx-auto mb-4" src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-2.png`} alt="Profile Avatar" />
                    <h2 className="text-lg  font-semibold">Huỳnh Ty</h2>
                    
                    <h1 className="text-gray-500 text-xs mb-2">Software Engineer
                        <span className="text-gray-500 ml-1 sub-title">@ uStudy</span>
                    </h1>
                    <button className="bg-primary text-white py-2 px-4 rounded-lg">
                        Theo dõi tôi
                    </button>
                    </div>
                </div>
                <div className="col col-auto">
                    <div className="card w-[340px] mx-auto text-center border-2 rounded-lg bg-white py-6 px-3 shadow-sm">
                    <img className="w-32 block mx-auto mb-4" src={`${process.env.PUBLIC_URL}/assets/avatar/avatar-5.png`} alt="Profile Avatar" />
                    <h2 className="text-lg  font-semibold">Hồng Thức</h2>
                    <h1 className="text-gray-500 text-xs mb-2">Software Engineer
                        <span className="text-gray-500 ml-1 sub-title">@ uStudy</span>
                    </h1>
                    <button className="bg-primary text-white py-2 px-4 rounded-lg">
                        Theo dõi tôi
                    </button>
                    </div>
                </div>
            </div>
             
        </> 

    );
};

export default MembersGrid;