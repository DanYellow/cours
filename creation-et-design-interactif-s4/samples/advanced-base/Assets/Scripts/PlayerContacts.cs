using UnityEngine;

public class PlayerContacts : MonoBehaviour
{
    public BoxCollider2D bc;

    [Header("Crush detection")]
    public LayerMask listContacts;
    public float crushLengthDetection = 0.25f;
    public float boxCastScaleX = 0.95f;
    public float boxCastScaleY = 0.95f;

    public bool hasLeftContact = false;
    public bool hasTopContact = false;
    public bool hasBottomContact = false;
    public bool hasRightContact = false;

    private void FixedUpdate() {
        hasLeftContact = HasLeftContact();
        hasTopContact = HasTopContact();
        hasBottomContact = HasBottomContact();
        hasRightContact = HasRightContact();
    }

    public bool HasTopContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y + (crushLengthDetection / 2) + 0.05f),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection - 0.05f),
            0,
            listContacts
        ).Length == 1;
    }

    public bool HasBottomContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2) - 0.05f),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection + 0.05f),
            0,
            listContacts
        ).Length == 1;
    }

    public bool HasLeftContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x - (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;
    }

    public bool HasRightContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x + (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.color = Color.magenta;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x - (crushLengthDetection / 2), bc.bounds.center.y),
                new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY)
            );
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x + (crushLengthDetection / 2), bc.bounds.center.y),
                new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY)
            );

            Gizmos.color = Color.yellow;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2) - 0.05f),
                new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection + 0.05f)
            );
            // Top
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.center.y + (crushLengthDetection / 2) + 0.05f),
                new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection - 0.05f)
            );
        }
    }
}
