using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemySpawn : MonoBehaviour
{
    public GameObject enemyToSpawn;
    public VoidEventChannelSO onEnemySpawn;
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Application.productName " + Application.productName);
        InvokeRepeating(nameof(SpawnEnemy), 0f, 5f);
    }

    // Update is called once per frame
    void SpawnEnemy()
    {
        GameObject go = Instantiate(enemyToSpawn, transform.position, Quaternion.identity);
        go.GetComponent<Rigidbody2D>().velocity = Random.insideUnitCircle * 12.5f;
        onEnemySpawn.Raise();
    }
}
