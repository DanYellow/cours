using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[CreateAssetMenu(fileName = "Data", menuName = "Examples/InventoryData")]
public class InventoryData : ScriptableObject
{
    public List<string> listItems = new List<string>();
    public void AddItem(string item) {
        listItems.Add(item);
    }
}
