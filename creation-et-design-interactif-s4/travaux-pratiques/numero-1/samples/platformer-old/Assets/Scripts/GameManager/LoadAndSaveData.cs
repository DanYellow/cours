
using UnityEngine;
using System.Linq;

// Script unique
public class LoadAndSaveData : MonoBehaviour
{
    public static LoadAndSaveData instance;
    char[] splitters = { ',' };

    private void Awake()
    {
        if (instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }
        instance = this;
    }


    // Start is called before the first frame update
    void Start()
    {
        Load();
    }

    // Update is called once per frame
    public void Load()
    {
        PlayerInventory.instance.AddCoins(PlayerPrefs.GetInt("coins", 0));
        // Inventory.instance.UpdateTextUI();

        // string[] itemsSaved = PlayerPrefs.GetString("inventoryItems", "").Split(splitters, System.StringSplitOptions.RemoveEmptyEntries);

        // for (int i = 0; i < itemsSaved.Length; i++)
        // {
        //     int id = int.Parse(itemsSaved[i]);
        //     Item currentItem = ItemsDatabase.instance.allItems.Single(item => item.id == id);
        //     Inventory.instance.content.Add(currentItem);
        // }

        // Inventory.instance.UpdateInventoryUI();

        /*        int currentHealth = PlayerPrefs.GetInt("health", 100);
                PlayerHealth.instance.currentHealth = currentHealth;
                PlayerHealth.instance.healthBar.SetHealth(currentHealth);*/
    }

    public void Save()
    {
        // Ne lève pas d'erreur en cas d'erreur
        PlayerPrefs.SetInt("coins", PlayerInventory.instance.GetCoins());

        // if (CurrentSceneManager.instance.levelToUnlock > PlayerPrefs.GetInt("levelReached", 1))
        // {
        //     PlayerPrefs.SetInt("levelReached", CurrentSceneManager.instance.levelToUnlock);
        // }

        // string itemsInInventory = string.Join(",", Inventory.instance.content.Select(item => item.id));
        // PlayerPrefs.SetString("inventoryItems", itemsInInventory);



        /*PlayerPrefs.SetInt("health", PlayerHealth.instance.currentHealth);*/
    }
}
