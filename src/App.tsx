import {useEffect, useState} from 'react'
import './App.css'
import UserService from "./services/UserService";
import {IUserData} from  'src/models/User.d.ts';
import Pagination from "./Pagination";
import users from './dummy.json'


function App() {
    const [flattenedData, setFlattenedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [starting, setStarting] = useState(1);
    const [ending, setEnding] = useState(50)
    const [usersForPage, setUsersForPage] = useState([]);
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async (results = 5000) => {
        switch (true) {
            case results <= 100:
                setPerPage(10)
                break;
            case results <= 300:
                setPerPage(20)
                break;
            case results <= 500:
                setPerPage(100)
                break;
            case results > 500:
                setPerPage(300)
                break;
            default:
                setPerPage(50)
        }
        UserService.getUsers({results}).then((response) => {
            if(response && Array.isArray(response.results) && response.results.length > 0) {
                flattenData(response.results);
            }
        }).catch((error) => {
            console.log(error);
        });

         //flattenData(users);
    };
    //console.log(flattenedData)
    const flattenData = (users) => {
        const flattenedUsers = users.map((user) => {
            let flattenedUser = {};

            const flatten = (data, name = '') => {
                if (typeof data === 'object') {
                    for (let key in data) {
                        flatten(data[key], name + key + '_');
                    }
                } else {
                    flattenedUser[name.slice(0, -1)] = data;
                }
            };

            flatten(user);
            return flattenedUser;
        });

        setFlattenedData(flattenedUsers);
    };

    useEffect(() => {
        setTotalPages(Math.ceil(flattenedData.length / perPage));
        generateTableRows();
    }, [flattenedData, perPage])

    const generateTableRows = () => {
        if (flattenedData.length > 0) {
            const startIdx = (currentPage - 1) * perPage;
            setStarting(1);
            const endIdx = startIdx + perPage;
            setEnding(endIdx);
            const usersForPage = flattenedData.slice(startIdx, endIdx);
            setUsersForPage(usersForPage);
        }
    };

    const paginateUsers = (pageNum) => {
        const startIdx = (pageNum - 1) * perPage;
        startIdx === 0 ? setStarting(1) : setStarting(startIdx);
        const endIdx = startIdx + perPage;
        setEnding(endIdx);
        const usersForPage = flattenedData.slice(startIdx, endIdx);
        setUsersForPage(usersForPage);
    }

    const handlePageClick = (pageNum) => {
        if (pageNum <= totalPages && pageNum > 0) {
            setCurrentPage(pageNum);
            paginateUsers(pageNum)
        }

    };

    const generateHeaders = () => {
        let keys = Object.keys(usersForPage[0]);
        {return keys.map((key, index) => (
            <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider"
            >
                {key.includes('_') ? key.replaceAll(/_/ig, ' '): key}
            </th>
        ))}
    }
    return (
        <div className="flex flex-col">
            {totalPages > 0 && <Pagination data={{totalPages, currentPage, starting, ending, flattenedData}} handlePageClick={handlePageClick}/>}
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 border rounded border-red-200">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {usersForPage.length > 0 && generateHeaders()}
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {usersForPage.map((user) => (
                                <tr key={user.login_uuid}>
                                    <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${user.gender} `}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name_title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name_first}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name_last}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_street_number}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_street_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_city}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_state}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_country}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_postcode}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_coordinates_latitude}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_coordinates_longitude}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_timezone_offset}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.location_timezone_description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_uuid}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_password}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_salt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_Md5}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_sha1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.login_sha256}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.dob_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.dob_age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.registered_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.registered_age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.cell}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id_value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.picture_large}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.picture_medium}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.picture_thumbnail}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.nat}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <Pagination data={{totalPages, currentPage, starting, ending, flattenedData}} handlePageClick={handlePageClick}/>
        </div>
    );
}

export default App
