import React, { useState } from "react";
import { useRecoilValue } from 'recoil';
import { states } from '../states';

function ItemSelector() {
    const [chosenItem, setChosenItem] = useState("");
    const [chosenAddOns, setChosenAddOns] = useState([]);
    const [message, setMessage] = useState("");
    const allItems = useRecoilValue(states.survivorItemsState);
    const allAddOns = useRecoilValue(states.survivorItemAddOnsState);
    const currentAllowedItems = allItems.filter(i => i.allowed);
    let noItemAllowed = useRecoilValue(states.noItemAllowedState) ? 1 : 0;
    const currentAllowedAddOns = allAddOns.filter(a => a.allowed);
    let addEmptySlot = useRecoilValue(states.noItemAddOnAllowedState) ? 1 : 0

    function handleClick() {
        setChosenItem("");
        setChosenAddOns([]);
        let item = "";

        if (currentAllowedItems.length > 0) {
            let randomNumber = Math.floor(Math.random() * (currentAllowedItems.length + noItemAllowed));
            if (randomNumber !== currentAllowedItems.length) {
                item = currentAllowedItems[randomNumber]
                setChosenItem(item.name);
            }
        }

        let newChosenAddOns = [];
        if (item) {
            let applicableAddOns = currentAllowedAddOns.filter(a => a.item_type_id == item.item_type_id)
        console.log(applicableAddOns)

        
        let alreadyChosen = []
        let numberOfAddOnsToChooseFrom = applicableAddOns.length < 2 ? applicableAddOns.length : 2

        for (let i = 0; i < numberOfAddOnsToChooseFrom ; i++) {
            let randomNumber;
            do {
              randomNumber = Math.floor(Math.random() * (applicableAddOns.length + addEmptySlot));
            } while (alreadyChosen.includes(randomNumber))
            if (randomNumber !== applicableAddOns.length) {
              newChosenAddOns.push(applicableAddOns[randomNumber])
              alreadyChosen.push(randomNumber)
            } else {
                newChosenAddOns.push("Empty Slot")
            }
          }
          setChosenAddOns(newChosenAddOns)
        }

        handleMessage(item, newChosenAddOns)
    }


    function handleMessage(selectedItem, selectedAddOns) {
        if (!selectedItem.name) {
            setMessage("No item")
        } else if (selectedItem.item_type_id !== "6") {
           setMessage(`${selectedItem.name} + ${handleAddOnMessage(selectedAddOns[0])} & ${handleAddOnMessage(selectedAddOns[1])}`)
        } else {
          setMessage(selectedItem.name)
        }
    }

    function handleAddOnMessage(addOn) {
      if (addOn?.name) {
        return addOn.name
      } else {
        return addOn
      }
    }

    return(
        <div>
          <button onClick={handleClick}>Get Item and Add Ons</button>
          <p>{message}</p>
        </div>
      )
}

export { ItemSelector };