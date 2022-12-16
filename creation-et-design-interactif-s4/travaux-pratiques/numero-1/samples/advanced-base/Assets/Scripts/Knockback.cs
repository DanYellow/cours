using UnityEngine;

public class Knockback : MonoBehaviour
{
    public Rigidbody2D rb;
    private bool isKnockbacked = true;

    public void Knockbacked(Vector3 direction, float strength)
    {
        rb.MovePosition(transform.position + direction * strength);       
    }
}
