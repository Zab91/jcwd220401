import {
  Flex,
  Box,
  Text,
  Stack,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Radio,
  Divider,
  Input,
  Button,
  Image,
  Icon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Heading,
  Td,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { syncAddress } from "../redux/addressSlice";
import { cartSync, cartQty } from "../redux/cartSlice";
import { deleteCart } from "../redux/userSlice";

export default function CartDetail() {
  const {
    name,
    cart,
    id: userId,
    id,
  } = useSelector(state => state.userSlice.value);
  const { data } = useSelector(state => state.addressSlice.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const data2 = useSelector(state => state.cartSlice.value);
  console.log(data2);

  const [desId, setDesId] = useState();
  const [value, setValue] = useState("");
  const [ongkir, setOngkir] = useState();
  const [getOngkir, setGetOngkir] = useState();

  console.log(value);

  const onDeleteCart = async id => {
    try {
      await axios.delete(`http://localhost:8000/cart/${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Barang telah dihapus",
        timer: 2000,
      });
      const result = await axios.get(`http://localhost:8000/cart/${userId}`);
      dispatch(deleteCart());
      dispatch(cartSync(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = async (id, quantity) => {
    if (!quantity) return;
    try {
      await axios.patch(`http://localhost:8000/cart/${id}`, {
        quantity,
      });
      const result = await axios.get(`http://localhost:8000/cart/${userId}`);
      dispatch(cartSync(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  const orderCart = async () => {
    try {
      //value starter jne, pos, tiki
      const courier = value;
      const weight = 1700;
      const destination = desId;
      const origin = 22;
      const order = { origin, destination, weight, courier };
      const result = await axios.post(
        `http://localhost:8000/orderCart/cost`,
        order,
      );
      setOngkir(result.data.rajaongkir.results[0].costs);
      console.log("Paket Ongkir", result.data.rajaongkir.results[0].costs);
      console.log("ongkir", ongkir);
    } catch (err) {
      console.log(err);
    }
  };

  const ongkirMap = ongkir?.map(val => {
    console.log(val.cost);
    return (
      <option>
        {val.service +
          " Harga Ongkir :" +
          " " +
          val.cost?.map(i => {
            return i.value + ", " + "estimasi waktu" + " " + i.etd + " hari";
          })}
      </option>
    );
  });

  console.log(ongkirMap);

  const getAddress = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/address/addressById/${id}`,
      );
      console.log("cek setAddress", result.data);
      dispatch(syncAddress(result.data));
      console.log(syncAddress(result.data));
    } catch (err) {
      console.log(err);
    }
  };

  // const rendOngkir = () => {
  //   return Array.from(ongkir).map((val, i) => {
  //     return (
  //       <option
  //         value={val.service}
  //         key={i}
  //       >
  //         {val.service + " "} {val.cost}
  //       </option>
  //     );
  //   });
  // };

  console.log(desId);

  useEffect(() => {
    getAddress();
  }, [id]);

  return (
    <>
      <Flex
        minH={"100vh"}
        algin={"center"}
        justify={"center"}
        bg="#fff"
        maxWidth={"506px"}
        overflow={"scroll"}
      >
        <Stack
          spacing={4}
          mx={"auto"}
          maxW={"lg"}
        >
          <Box
            bg={" #ebf5e9"}
            height="70px"
            marginTop={"25px"}
            paddingTop={"5px"}
          >
            <Text
              fontWeight={"bold"}
              fontSize="xl"
              align={"center"}
            >
              Keterangan Keranjang
            </Text>
            <Box
              display={"flex"}
              paddingTop={"3px"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"}>Name: {name}</Text>
            </Box>
          </Box>
          <Divider />

          <Box
            display="flex"
            justifyContent={"center"}
          >
            <Text fontWeight="bold">Item yang dibeli</Text>
          </Box>
          <Box>
            {data2.length === 0 ? (
              <>
                <Box align="center">
                  <Text>Keranjang Kosong</Text>
                  <Text
                    as={Link}
                    to="/"
                    textAlign="center"
                    fontWeight="bold"
                    color="blue.400"
                    w="150px"
                    _hover={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Beli sekarang
                  </Text>
                </Box>
              </>
            ) : (
              <TableContainer
                bg="grey.100"
                maxWidth="450px"
                maxHeight="200px"
                overflowY={"scroll"}
              >
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Img</Th>
                      <Th>Keterangan</Th>
                      <Th>Harga</Th>
                      <Th>Jumlah Item</Th>
                      <Th>Hapus Item</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data2?.map((item, index) => {
                      return (
                        <Tr key={index}>
                          <Td>
                            <Stack>
                              <Image
                                boxSize="35px"
                                objectFit="cover"
                                src={item.Product.image}
                              />
                            </Stack>
                          </Td>
                          <Td>
                            <Box
                              display="flex"
                              fontSize="xs"
                            >
                              <Text
                                fontWeight="bold"
                                mr="5px"
                              >
                                {" "}
                                {item.Product.name}{" "}
                              </Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box
                              display="flex"
                              fontSize="xs"
                            >
                              <Text
                                fontWeight="bold"
                                mr="5px"
                              >
                                {" "}
                                {item.Product.price}{" "}
                              </Text>
                            </Box>
                          </Td>
                          <Td>
                            <Box
                              display="flex"
                              fontSize="xs"
                            >
                              <Input
                                type={"number"}
                                defaultValue={item.quantity}
                                fontWeight="bold"
                                mr="5px"
                                onChange={event =>
                                  updateQty(item.id, event.target.value)
                                }
                              />
                            </Box>
                          </Td>
                          <Td>
                            <Button onClick={() => onDeleteCart(item.id)}>
                              <Icon
                                boxSize="4"
                                as={FaTrashAlt}
                              />
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </Box>
          <br></br>
          <Heading
            fontStyle={"bold"}
            fontSize="18px"
          >
            <Text align={"left"}>Pilih Alamat</Text>
          </Heading>
          <Stack align={"left"}>
            {data?.map(item => {
              return (
                <>
                  <CheckboxGroup overflowY={"scroll"}>
                    <Checkbox
                      value={item.cityId}
                      onChange={e => setDesId(e.target.value)}
                    >
                      <Stack
                        spacing={4}
                        mx={"auto"}
                        maxW={"lg"}
                        py={3}
                        px={3}
                      >
                        <Box
                          rounded={"lg"}
                          bg={"#ebf5e9"}
                          boxShadow={"lg"}
                          p={3}
                          marginTop="2px"
                        >
                          <Text>{item.addressFill}</Text>
                          <Text>{item.district}</Text>
                          <Text>{item.city}</Text>
                          <Text>{item.Province}</Text>
                          <Text>{item.postal_code}</Text>
                          <Text>{item.detail}</Text>
                        </Box>
                      </Stack>
                    </Checkbox>
                  </CheckboxGroup>
                </>
              );
            })}
          </Stack>
          <FormControl>
            <Heading
              fontSize={"18px"}
              fontWeight={"bold"}
            >
              <Text align={"left"}>Pilih Kurir</Text>
            </Heading>
            <br></br>
            <RadioGroup
              onChange={setValue}
              value={value}
              onClick={() => orderCart()}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Radio value={"jne"}>jne</Radio>
              <Radio value={"tiki"}>tiki</Radio>
              <Radio value={"pos"}>pos indonesia</Radio>
            </RadioGroup>
          </FormControl>
          {/* {ongkir?.map(item => {
            return (
              <>
                <RadioGroup>
                  <Radio
                  value={ongkir}
                  onChange={e => setGetOngkir(e.target.value)}
                  >
                    {ongkir}
                  </Radio>
                </RadioGroup>
              </>
            );
          })} */}
          {/* <Button onClick={() => orderCart()}>Paket Ongkir</Button> */}
          <Select>{ongkirMap} </Select>
          <Box
            mt="10px"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              // onClick={() => orderCart()}
              w="full"
              borderColor="yellow.400"
              borderRadius="9px"
              borderWidth="2px"
              _hover={{ bg: "yellow.300" }}
              disabled={data2.length === 0 ? true : false}
            >
              Beli
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
