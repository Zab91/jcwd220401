import {
  Flex,
  Box,
  Text,
  Stack,
  RadioGroup,
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
  Td,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
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

export default function SelectAddress() {
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
  const [move, setMove] = useState(false);

  const getAddress = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/address/addressById/${id}`,
      );
      // console.log(result.data);
      dispatch(syncAddress(result.data));
      // console.log(syncAddress(result.data));
      // console.log(result.data.data[0].cityId);
      // setDesId(result.data.data[0].cityId);
      // console.log(desId);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(value);

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
              Ganti Alamat
            </Text>
          </Box>
          <Divider />
          <Stack spacing={4}>
            {data?.map(item => {
              return (
                <>
                  <Text>{item.addressFill}</Text>
                  <Text>{item.district}</Text>
                  <Text>{item.city}</Text>
                  <Text>{item.province}</Text>
                </>
              );
            })}
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
