using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(menuName = "Inventory/Inventory")]
public class Inventory : ScriptableObject
{
    public List<InventoryItem> content = new List<InventoryItem>();

    public void AddItem(Item item, int amount = 1)
    {
        // bool hasItem = false;
        for (var i = 0; i < content.Count; i++)
        {
            if(content[i].item == item) {
                content[i].AddAmount(amount);
                // hasItem = true;
                break;
            }
        }
    }
}

[SerializeField]
public class InventoryItem {
    public Item item;
    public int amount;
    public InventoryItem(Item _item, int _amount){
        item = _item;
        amount = _amount;
    }

    public void AddAmount(int value) {
        amount += value;
    }
}