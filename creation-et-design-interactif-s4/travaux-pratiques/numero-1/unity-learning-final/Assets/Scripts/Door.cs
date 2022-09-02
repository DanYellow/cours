using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Door : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        // other.gameObject.TryGetComponent<Player>(out Player player)
        if (other.CompareTag("Player"))
        {
            Player player = other.gameObject.GetComponent<Player>();
            Key key = player.GetKey();
            if (key != null)
            {
                key.SetFollowTarget(this.transform);
                player.SetKey(null);
            }
        }
    }
}
