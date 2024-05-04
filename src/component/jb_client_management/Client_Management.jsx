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
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [deleteRef, setDeleteRef] = useState(0);  

  const [openEditPayload, setOpenEditPayload] = useState({
    client_name: "",
    client_ref_no: "",
    client_mobile_number: "",
    client_description_info: "",
  });

  useEffect(() => {
    getClients();
  }, []);


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



  const getClients = () => {
    const token = Cookies.get("token");
    // console.log("Cokiess for Client  :",token);
    if (!token) {
      naviagte("/");
    }

    axios
      .get("https://jaybharat-api.vercel.app/jb/client/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response Data :", response.data);
        setClientData(response.data); // Assuming the response is an array of client data
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  const handleEdit = async (e, client_data) => {
    const token = Cookies.get("token");
    if (!token) {
      naviagte("/");
    }
    setLoading(true);
    axios
      .put(
        `https://jaybharat-api.vercel.app/jb/client/edit/${openEditPayload.id}`,
        client_data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Response Data:", response.data);
        if (response.data.status === 200) {
          setLoading(false);
          setClientData([]);
          getClients();
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
          getClients();
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
      .then(() => {
        setClientData([]);
        getClients();
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        setLoading(false);
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

          <div className="mt-16 flex lg:mb-[10rem] gap-x-7">
            <div>
              {/* Table */}
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
                {clientData.data?.length > 0
                  ? clientData.data.map((item) => (
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
                  : [1, 2, 3, 4, 5, 6, 7].map((v) => (
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

              <AlertDialog asChild open={openModel}>
                {/* <AlertDialogTrigger className="">
                  <Button className="  xl:w-[5rem] lg:w-[4em] h-[2rem] font-inter bg-gray-700 text-white rounded-lg ml-4">
                    {" "}
                    Edit
                  </Button>
                </AlertDialogTrigger> */}
                <AlertDialogContent>
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
                </AlertDialogContent>
                {/* <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Edit the Client</AlertDialogTitle>
                    <AlertDialogDescription>
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
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      <button onClick={() => setOpenModel(false)}>
                        Cancel
                      </button>
                    </AlertDialogCancel>
                    <AlertDialogAction>
                      <button onClick={handleEdit}>Edit New Value</button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent> */}
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
        <div className="tooltip-message">
          Client data saved and onboarded successfully!
        </div>
      )}
    </div>
  );
};

export default Client_Management;
