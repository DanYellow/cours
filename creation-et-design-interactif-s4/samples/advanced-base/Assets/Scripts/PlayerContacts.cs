using UnityEngine;
using UnityEngine.Tilemaps;

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

    public Grid grid;

    private void FixedUpdate() {
        hasLeftContact = HasLeftContact();
        hasTopContact = HasTopContact();
        hasBottomContact = HasBottomContact();
        hasRightContact = HasRightContact();

        GetTilePosition();
    }

    private bool HasTopContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y + (crushLengthDetection / 2) + 0.05f),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection - 0.05f),
            0,
            listContacts
        ).Length == 1;
    }

    private bool HasBottomContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2) - 0.05f),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection + 0.05f),
            0,
            listContacts
        ).Length == 1;
    }

    private bool HasLeftContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x - (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;
    }

    private bool HasRightContact() {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x + (crushLengthDetection / 2), bc.bounds.center.y),
            new Vector2(crushLengthDetection + bc.size.x, bc.size.y * boxCastScaleY),
            0,
            listContacts
        ).Length == 1;
    }

    private void GetTilePosition() {
        Collider2D collider2d = Physics2D.OverlapBox(
            new Vector2(bc.bounds.center.x, bc.bounds.center.y - (crushLengthDetection / 2) - 0.05f),
            new Vector2(bc.size.x * boxCastScaleX, bc.size.y + crushLengthDetection + 0.05f),
            0,
            listContacts
        );
        if(collider2d == null) {
            return;
        }
        ContactPoint2D[] list = new ContactPoint2D[1];
        collider2d.GetContacts(list);
        Tilemap tilemap = collider2d.GetComponent<Tilemap>();

        Vector3Int cellPosition = tilemap.WorldToCell(list[0].point);
        TileBase tile = tilemap.GetTile(cellPosition);
        // Or, if you need the tile's position:
        Vector3 tilePosition = tilemap.CellToWorld(cellPosition);
        // grid
        // print(Camera.main);
        // Ray ray = Camera.main.ScreenPointToRay(collider2d.transform.position);
        // // get the collision point of the ray with the z = 0 plane
        // Vector3 worldPoint = ray.GetPoint(-ray.origin.z / ray.direction.z);
        // Vector3Int position = grid.WorldToCell(worldPoint);

        print(tilePosition);
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
