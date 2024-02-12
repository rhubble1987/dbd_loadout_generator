import React, { useEffect, useState } from "react";
import { readRemoteFile } from "react-papaparse";
import { Checkbox } from "./checkbox";
import { useRecoilState } from 'recoil';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { states } from "../states";
import { urls } from "../urls";
import { deleteData, insertData, initIndexDb, getAllData } from "../Utilities/indexDb"

function List({ id, listState, emptyAllowedState, listUrl, filter }) {
    const [list, setList] = useRecoilState(listState)
    const [emptyAllowed, setEmptyAllowed] = useRecoilState(emptyAllowedState)
    const [displayState, setDisplayState] = useState(false)
    const [indexDb, setIndexDb] = useState(null)
    const objectStore = `${id}NotAllowed`
    const [groupedByKiller, setGroupedByKiller] = useState([])
    useEffect(() => {
        initIndexDb().then(indexDbInstance => {
          setIndexDb(indexDbInstance)
          readRemoteFile(listUrl, {
            header: true,
            complete: (results) => {
              let sortedResults = results.data.sort((a,b) => {
                if (a.name < b.name) {
                  return -1;
              }
              if (a.name > b.name) {
                  return 1;
              }
              return 0;
              })
              let filteredData = removeOppositeRoleOfferings(sortedResults);
              getAllData(indexDbInstance, objectStore).then(savedObjects => {
                savedObjects.forEach(object => {
                  filteredData.find(entry => entry.id === object.id).allowed = false
                })
                setList(filteredData)
                if (id === "killerAddOns") {
                  readRemoteFile(urls.killers, {
                    header: true,
                    complete: results => {
                      let sortedResults = results.data.sort((a,b) => {
                        if (a.name < b.name) {
                          return -1;
                      }
                      if (a.name > b.name) {
                          return 1;
                      }
                      return 0;
                      })

                      const groupedByKiller = sortedResults.map(killer => {
                        return {
                          killer: killer.name,
                          addOns: filteredData.filter(addOn =>
                            addOn.killer_id === killer.id
                          )
                        }
                      })
                      
                      setGroupedByKiller(groupedByKiller)
                      
                    }
                  })
                } else {
                  setList(filteredData)
                }
              })
            }
          });
          if (id === "killerAddOns") {
            
          }
        }).catch(error => {
          console.error("Failed to initialize indexDb", error)
        });
      }, []);

      function removeOppositeRoleOfferings(data) {
        if (id === "survivorOfferings") {
          return data.filter(offering => offering.role !== "killer")
        } else if (id === "killerOfferings") {
          return data.filter(offering => offering.role !== "survivor")
        } else {
          return data;
        }
      }
    
      function handleClick(selectAll) {
        const newListState = list.map(item => {
          if (!selectAll) {
            insertData(indexDb, `${id}NotAllowed`, {id: item.id, name: item.name}).then(() => {
              console.log("Data inserted")
          })}

          if (selectAll) {
            deleteData(indexDb, `${id}NotAllowed`, item.id).then(() => {
              console.log("Data deleted")
            })
          }
          return {
            ...item,
            allowed: selectAll
          };
        });
  
        setList(newListState)
      }

      function handleEmptyToggle(event) {
        setEmptyAllowed(event.target.checked)
      }

      function renderEmptyToggle() {
        if (id !== "survivors" && id !== "killers") {
          return(
            <Form>
              <div>
                <Form.Check
                  onChange={(event) => handleEmptyToggle(event)}
                  type="switch"
                  id="empty-toggle"
                  label="Allow Empty Slot"
                  checked={emptyAllowed}
                />
              </div>
          </Form>
          )
        }
      }
    
      return(
        <Accordion>
          <Accordion.Item eventKey="0">
          <Accordion.Header>{`Filter ${filter}`}</Accordion.Header>
          <Accordion.Body>
          {renderEmptyToggle()}
          <button onClick={() => handleClick(true)}>Select All</button>
          <button onClick={() => handleClick(false)}>Unselect All</button>
          {id === "killerAddOns" ? (
            groupedByKiller.map((killer) => {
              return (
              <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{killer.killer}</Accordion.Header>
                <Accordion.Body>
                  {killer.addOns.map(addOn => {
                    return (
                    <Checkbox key={addOn.id} item={addOn} listState={listState} db={indexDb} id={id}/>
                    )
                  })}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
              )
            })
          ) : (
          list.map((item) => {
            return (
            <Checkbox key={item.id} item={item} listState={listState} db={indexDb} id={id}/>
            )
          }))}
          </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
};

export { List };