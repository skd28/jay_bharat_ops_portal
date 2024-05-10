import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Create from "./Create";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./client.css";
import Icons from "../Icons";

const Client_Management = () => {
  const naviagte = useNavigate();

  const [clientData, setClientData] = useState([]);

  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [statusError, setStatusError] = useState(null);
  const [dataPerPage, setDataPerPage] = useState(5);

  const [deleteRef, setDeleteRef] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startRange, setStartRange] = useState(1);

  const [openEditPayload, setOpenEditPayload] = useState({
    client_name: "",
    client_ref_no: "",
    client_mobile_number: "",
    client_description_info: "",
  });
  const [paginationRef, setPaginationRef] = useState([]);
  const [paginationRefClone, setPaginationRefClone] = useState([]);

  useEffect(() => {
    getClients();
  }, []);

  const paginationNext = () => {
    if (currentPage !== paginationRef[paginationRef.length - 1]) {
      setClientData([]);
      setCurrentPage((prev) => prev + 1);
      getClients(currentPage + 1);
      if (
        paginationRef.length > 3 &&
        currentPage === paginationRefClone[paginationRefClone.length - 1] && 
        !paginationRefClone.includes(paginationRef[paginationRef.length - 1])
      ) {
        let pages = paginationRef.slice(0);
        setStartRange((prev) => prev + 1);
        setPaginationRefClone(pages.slice(startRange, startRange + 3));
      }
    }
  };

  const paginationPrev = () => {
    if (currentPage !== 1) {
      setClientData([]);
      setCurrentPage((prev) => prev - 1);
      getClients(currentPage - 1);
      if (
        paginationRef.length > 3 &&
        currentPage === paginationRefClone[0] && 
        paginationRefClone[0] !== 1
      ) {
        let pages = paginationRef.slice(0);
        setStartRange((prev) => prev - 1);
        setPaginationRefClone(pages.slice(startRange - 2, startRange + 1));
      }
    }
  };

  const setEditPayload = (item) => {
    setOpenEditPayload(item);
    setOpenModel(true);
  };

  const setDeletePayload = (id_ref) => {
    setDeleteRef(id_ref);
    setOpenDeleteModel(true);
  };

  /* const handleChange = (e) => {
    setOpenEditPayload({ ...openEditPayload, [e.target.name]: e.target.value });
  }; */

  const getClients = (page) => {
    const token = Cookies.get("token");
    // console.log("Cokiess for Client  :",token);
    if (!token) {
      naviagte("/");
    }

    setDataLoading(true);
    axios
      .get(
        `https://jaybharat-api.vercel.app/jb/client/clients?page=${
          page || "1"
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        let { count } = response.data;
        let modulo =
          Number.isInteger(count / dataPerPage)
            ? count / dataPerPage
            : parseInt(count / dataPerPage) + 1;
        setPaginationRef(Array.from({ length: modulo }, (_, i) => i + 1));
        if (page === undefined) {
          let pages = Array.from({ length: modulo }, (_, i) => i + 1);
          if (pages.length > 3) {
            setPaginationRefClone(pages.slice(0, 3));
          } else {
            setPaginationRefClone(pages);
          }
        }
        console.log("Response Data :", response.data.results);
        // response.data.results?.sort((a, b) => {
        //   //add sorting
        //   return a.id - b.id;
        // });
        setDataLoading(false);
        setClientData(response.data.results); // Assuming the response is an array of client data
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  const handleChange = (e) => {
    setOpenEditPayload({ ...openEditPayload, [e.target.name]: e.target.value });
    // console.log(clientData);
  };

  const handleEdit = async (e) => {
    const token = Cookies.get("token");
    if (!token) {
      naviagte("/");
    }
    setEditLoading(true);
    axios
      .put(
        `https://jaybharat-api.vercel.app/jb/client/edit/${openEditPayload.id}`,
        openEditPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response Data:", response.data);
        if (response.data.status === 200) {
          setOpenModel(false);
          setClientData([]);
          getClients(null);
          setEditLoading(false);

          setStatusError(response.data.status);
          setShowAlert("Your data is Edited Successfully");
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        } else if (response.data.status === 500) {
          setStatusError(data.status);
          setShowAlert(response.data.error);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error editing client:", error);
      });
  };

  const handleDelete = () => {
    const token = Cookies.get("token");
    if (!token) {
      naviagte("/");
    }
    setLoading(true);
    axios
      .delete(
        `https://jaybharat-api.vercel.app/jb/client/delete/${deleteRef}`,
        // Sending the updated payload as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response Data:", response.data);
        if (response.data.status === 200) {
          setOpenDeleteModel(false);
          setLoading(false);
          setClientData([]);
          getClients(null);
        }
      })
      .catch((error) => {
        console.error("Error editing client:", error);
      });
  };

  const handleSubmit = (e, client_data) => {
    e.preventDefault();
    const token = Cookies.get("token");
    if (!token) {
      naviagte("/");
    }
    setLoading(true);
    axios
      .post(
        "https://jaybharat-api.vercel.app/jb/client/create_client",
        client_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        let { data } = response;
        if (data.status === 200) {
          setClientData([]);
          getClients();
          setCurrentPage(1)
          setStatusError(data.status);
          setShowAlert("Client data saved and onboarded successfully!");
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);
          setLoading(false);
        } else if (data.status === 500) {
          setLoading(false);
          setStatusError(data.status);
          setShowAlert(`Sorry, ${data.error}`);
          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
        }
      })
      .catch(() => {
        setLoading(false);
        console.log("Error Signing up");
      });
  };

  return (
    <div className="relative">
      <div className="flex ">
        <Navbar />
        <div className="ml-12 ">
          <h1 className="font-medium text-[1.5rem] mt-16 font-inter ">
            Client Management
          </h1>
          <p className="py-1 font-inter">
            Manage, onbard and set activation status for the client
          </p>

          <div className="mt-16 flex lg:mb-[10rem] gap-x-7 relative">
            <div className="w-full flex flex-col items-center gap-y-6">
              {/* Table */}
              {!(!dataLoading && clientData?.length === 0) ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className=" xl:w-[20rem] lg:w-[20rem]  border-2 pl-5 text-[1rem] font-inter ">
                          Client Name
                        </TableHead>
                        <TableHead className=" xl:w-[10rem] lg:w-[8rem]  border-2 pl-4 text-[1rem] font-inter ">
                          Client Ref No
                        </TableHead>
                        <TableHead className=" xl:w-[18rem] lg:w-[20rem] border-2 pl-5 text-[1rem] font-inter ">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    {clientData?.length > 0
                      ? clientData.map((item) => (
                          <TableBody key={item.id} className="border-2">
                            <TableRow className="h-[3rem] ">
                              <TableCell className="font-inter pl-4">
                                {item.client_name}
                              </TableCell>
                              <TableCell className="border pl-4 font-inter  ">
                                {item.client_ref_no}
                              </TableCell>

                              <TableCell className="flex ml-4 xl:w-[18rem] lg:w-[11rem]">
                                <Button onClick={() => setEditPayload(item)}>
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => setDeletePayload(item.id)}
                                  className="ml-3"
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))
                      : [1, 2, 3, 4, 5].map((v) => (
                          <TableBody key={v} className="border-2">
                            <TableRow className="h-[3rem]">
                              <TableCell className="font-inter pl-4">
                                <div className="skeleton-box h-5 w-full"></div>
                              </TableCell>
                              <TableCell className="border pl-4 font-inter  ">
                                <div className="skeleton-box h-5 w-full"></div>
                              </TableCell>

                              <TableCell className="flex items-center gap-x-4 ml-4 xl:w-[18rem] lg:w-[11rem]">
                                <div className="skeleton-box h-7 w-1/2"></div>

                                <div className="skeleton-box h-7 w-1/2"></div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ))}
                  </Table>
                  {paginationRefClone.length ? (
                    <div className="absolute bottom-0 flex gap-3">
                      <button
                        className={`py-2 px-4 rounded-lg bg-gray-900 text-white ${
                          currentPage !== 1
                            ? "bg-gray-900 text-white"
                            : "bg-gray-300 text-white"
                        }`}
                        disabled={currentPage === 1}
                        onClick={() => paginationPrev()}
                      >
                        PREV
                      </button>
                      {paginationRefClone.map((page) => (
                        <div
                          key={page}
                          className={
                            currentPage === page
                              ? "rounded-xl p-[1px] border-[3px] border-blue-500"
                              : "rounded-xl p-[1px] border-[3px] border-[transparent]"
                          }
                        >
                          <button
                            className={`py-2 px-4 rounded-lg bg-gray-900 text-white`}
                            onClick={() => {setClientData([]);setCurrentPage(page);getClients(page)}}
                          >
                            {page}
                          </button>
                        </div>
                      ))}
                      <button
                        className={`py-2 px-4 rounded-lg bg-gray-900 text-white ${
                          currentPage !==
                          paginationRef[paginationRef.length - 1]
                            ? "bg-gray-900 text-white"
                            : "bg-gray-300 text-white"
                        }`}
                        disabled={
                          currentPage ===
                          paginationRef[paginationRef.length - 1]
                        }
                        onClick={() => paginationNext()}
                      >
                        NEXT
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <div className="text-center text-3xl xl:w-[50rem] lg:w-[50rem]">
                  No Data Found
                </div>
              )}

              <AlertDialog asChild open={openModel}>
                {/* <AlertDialogTrigger className="">
                  <Button className="  xl:w-[5rem] lg:w-[4em] h-[2rem] font-inter bg-gray-700 text-white rounded-lg ml-4">
                    {" "}
                    Edit
                  </Button>
                </AlertDialogTrigger> */}
                {/* <AlertDialogContent>
                  <AlertDialogHeader>
                    <Create
                      data={openEditPayload}
                      component="Edit"
                      loading={loading}
                      submitFunc={handleEdit}
                      showAlert={showAlert}
                      cancel={setOpenModel}
                    />
                  </AlertDialogHeader>
                </AlertDialogContent> */}
                {
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Edit the Client</AlertDialogTitle>
                      <div>
                        <p className=" font-inter text-[1rem] text-black font-bold">
                          Client Name
                        </p>
                        <Input
                          type="text"
                          value={openEditPayload.client_name}
                          name="client_name"
                          onChange={handleChange}
                        />
                        <p className=" font-inter text-[1rem] text-black mt-3 font-bold">
                          Client Ref No
                        </p>
                        <Input
                          type="text"
                          value={openEditPayload.client_ref_no}
                          name="client_ref_no"
                          onChange={handleChange}
                        />
                        <p className="  font-inter text-[1rem] text-black mt-3 font-bold">
                          Mobile Number
                        </p>
                        <Input
                          type="text"
                          value={openEditPayload.client_mobile_number}
                          name="client_mobile_number"
                          onChange={handleChange}
                        />
                        <p className=" font-inter text-[1rem] text-black mt-3 font-bold">
                          Other info
                        </p>
                        <Input
                          type="text"
                          value={openEditPayload.client_description_info}
                          name="client_description_info"
                          onChange={handleChange}
                        />
                      </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setOpenModel(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleEdit}
                        className="flex gap-x-3"
                      >
                        Edit New Value
                        {editLoading && (
                          <Icons string="loading" width="25px" height="25px" />
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                }
              </AlertDialog>

              <AlertDialog asChild open={openDeleteModel}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Content? Please note: Once you delete the client,
                      all associated records on every stage will get removed
                      from the overall dataset.
                    </AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <button onClick={() => setOpenDeleteModel(false)}>
                        Cancel
                      </button>
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 flex gap-x-2"
                      onClick={() => handleDelete()}
                    >
                      I understand, Delete client.
                      {loading && (
                        <Icons string="loading" width="25px" height="25px" />
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              <Create
                loading={loading}
                submitFunc={handleSubmit}
                showAlert={showAlert}
              />
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <div
          className={`tooltip-message ${
            statusError === 200
              ? "bg-black text-white"
              : "bg-red-700 text-white"
          }`}
        >
          {showAlert}
        </div>
      )}
    </div>
  );
};

export default Client_Management;
