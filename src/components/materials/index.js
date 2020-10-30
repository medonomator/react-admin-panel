import React, { useEffect, useState } from 'react'
import { API } from '../../helpers/axios'
import { Table, Loader } from 'semantic-ui-react'
import styles from './materials.module.sass'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const Materials = () => {
  const [materials, setMaterials] = useState([])
  const [isLoaded, setLoader] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await API('GET', 'v1/admin/materials')
      setLoader(true)
      setMaterials(result.data.data)
    }
    fetchData()
  }, [])

  var subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <div>
      <h1>Materials</h1>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Tags</Table.HeaderCell>
            <Table.HeaderCell>Аудиокниги</Table.HeaderCell>
            <Table.HeaderCell>Книги</Table.HeaderCell>
            <Table.HeaderCell>WebSite</Table.HeaderCell>
            <Table.HeaderCell>Youtube</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {!isLoaded && <Loader active inline />}

        <Table.Body>
          {materials.map((item) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  {item.tags.length &&
                    item.tags.map((item) => item.name).join(', ')}
                </Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell className={styles.change}>
                  <i
                    onClick={() => openModal(item)}
                    aria-hidden="true"
                    class="pencil alternate big icon"></i>
                </Table.Cell>
                <Table.Cell className={styles.delete}>
                  <i aria-hidden="true" class="delete big icon"></i>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <Modal
        closeTimeoutMS={100}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  )
}

export default Materials
