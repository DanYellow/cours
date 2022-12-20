using UnityEngine;

public class Knockback : MonoBehaviour
{
    public Rigidbody2D rb;

    public void Knockbacked(Vector3 direction, float strength)
    {
        rb.MovePosition(transform.position + direction * strength);       
    }
}
