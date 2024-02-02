using UnityEngine;
// 0.36 -0.1
public class PlayerContacts : MonoBehaviour
{
    public BoxCollider2D bc;

    [Header("Crush detection")]
    public LayerMask listContacts;
    public bool hasTopOrBottomCrushContact = false;
    public bool hasLeftOrRightCrushContact = false;
    public float crushLengthDetection = 0.25f;

    private void FixedUpdate()
    {
        hasTopOrBottomCrushContact = HasTopAndBottomContact().Length == 1;
        hasLeftOrRightCrushContact = HasLeftAndRightContact().Length == 1;
        if (HasLeftAndRightContact().Length > 0)
        {
            foreach (var item in HasLeftAndRightContact())
            {
                print("ff " + item.transform.name);

            }
        }
    }

    public RaycastHit2D[] HasTopAndBottomContact()
    {
        return Physics2D.LinecastAll(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushLengthDetection),
            new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushLengthDetection),
            listContacts
        );
    }

    public RaycastHit2D[] HasLeftAndRightContact()
    {
        return Physics2D.BoxCastAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y),
            new Vector2(bc.size.x * (2 + crushLengthDetection), bc.size.y * 0.9f),
            0,
            Vector2.zero,
            Mathf.Infinity,
            listContacts
        );
        // return Physics2D.LinecastAll(
        //     new Vector2(bc.bounds.min.x - crushLengthDetection, bc.bounds.center.y),
        //     new Vector2(bc.bounds.max.x + crushLengthDetection, bc.bounds.center.y),
        //     listContacts
        // );
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.min.x - crushLengthDetection, bc.bounds.center.y),
                new Vector2(bc.bounds.max.x + crushLengthDetection, bc.bounds.center.y)
            );
            Gizmos.color = Color.magenta;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushLengthDetection),
                new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushLengthDetection)
            );

            Gizmos.color = Color.yellow;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.center.y),
                new Vector2(bc.size.x * (2 + crushLengthDetection), bc.size.y * 0.9f)
            );
        }
    }
}
