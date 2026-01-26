using UnityEngine;

public class EnemyPatrol : MonoBehaviour
{
    // La méthode OnDrawGizmos permet d'afficher
    // des aides graphiques uniquement dans l'éditeur
    void OnDrawGizmos()
    {
        if (bc == null) return;

        // On dessine un cercle qui représente la détection de vides, nous le allons situer :
        // x : A l'extrême du BoxCollider du GameObject dans la direction où il se déplace
        // y : A la base du BoxCollider
        Gizmos.color = Color.aquamarine;
        Gizmos.DrawWireSphere(
            new Vector2(
                bc.bounds.center.x + (Mathf.Sign(transform.localScale.x) * bc.bounds.extents.x),
                bc.bounds.min.y
            ),
            obstacleCheckRadius
        );

        Gizmos.color = Color.red;
        // On dessine un trait qui représente la détection de murs, nous le allons situer :
        // x : A l'extrême du BoxCollider du GameObject dans la direction où il se déplace
        // y : Au milieu du BoxCollider
        Vector2 startCast = new Vector2(
            bc.bounds.center.x + (Mathf.Sign(transform.localScale.x) * bc.bounds.extents.x),
            bc.bounds.center.y
        );
        Gizmos.DrawLine(
            startCast,
            new Vector2(startCast.x + (Mathf.Sign(transform.localScale.x) * obstacleDetectionLength), startCast.y)
        );

    }
}
