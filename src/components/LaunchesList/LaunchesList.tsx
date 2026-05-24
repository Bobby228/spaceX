import {useEffect, useReducer} from "react";
import {Card, Text, Image, Button, Flex, Title} from "@mantine/core";
import './Launches.css'
import Modal from "../Modal/Modal.tsx";
import type {Action, Launch, State} from "../../types.ts";

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_launches':
      return {
        ...state,
        launches: action.payload,
      };
    case 'open_modal':
      return {
        ...state,
        isOpen: true,
        selectedLaunch: action.payload,
      };
    case 'close_modal':
      return {
        ...state,
        isOpen: false,
        selectedLaunch: null,
      };
    default:
      return state;
  }
}

const LaunchesList = () => {
  const [state, dispatch] = useReducer(reducer, {
    launches: [],
    isOpen: false,
    selectedLaunch: null,
  })

  const openModal = (launch: Launch) => {
    dispatch({
      type: 'open_modal',
      payload: launch,
    })
  }

  const closeModal = () => {
    dispatch({
      type: 'close_modal',
    })
  }

  const handleLaunches = (data: Launch[]) => {
    dispatch({
      type: 'set_launches',
      payload: data,
    })
  }

  useEffect(() => {
    const fetchFunc = async () => {
      const response = await fetch(
        'https://api.spacexdata.com/v3/launches?launch_year=2020'
      );
      const resJson = await response.json();
      handleLaunches(resJson);
      console.log(resJson);
    }
    fetchFunc()
  }, [])

  console.log(state.launches)

  return (
    <div className="launches_list">
      <Title order={1} mb={20}>SpaceX Launches 2020</Title>
      <Flex  justify='center' direction="row" wrap="wrap" gap="md">
        {state.launches.map((launch) => {
          return (
            <Card
              key={launch.mission_name}
              w={280}
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Flex mt={30} justify="center">
                <Image
                  src={launch.links?.mission_patch}
                  w={100}
                  h={100}
                  alt="Image"
                />
              </Flex>

              <Text mt={30} ta="center" fw={500}>
                {launch.mission_name}
              </Text>

              <Text mt={15} mb={40} ta="center" size="sm" c="dimmed">
                {launch.rocket?.rocket_name}
              </Text>

              <Button onClick={() => openModal(launch)} mt='auto' color="blue" fullWidth>
                See more
              </Button>
            </Card>
          );
        })}
      </Flex>
      {state.isOpen && state.selectedLaunch &&
        <Modal launch={state.selectedLaunch} onClose={closeModal} />
      }
    </div>
  );
};

export default LaunchesList;